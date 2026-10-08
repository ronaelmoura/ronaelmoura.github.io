-- Auth account verification uses the admin API; ownership is rechecked atomically here.
drop function public.igreen_submit_lead(uuid,jsonb,text,text,text,text);
create function public.igreen_submit_lead(
  p_request_id uuid, p_lead jsonb, p_phone_hash text,
  p_payload_hash text, p_consent_version text, p_consent_text text, p_expected_owner uuid
) returns text language plpgsql security invoker set search_path = '' as $$
declare cfg public.igreen_capture_config%rowtype;
  receipt public.igreen_capture_receipts%rowtype;
  new_lead uuid; n integer;
begin
  -- Serializes this low-volume campaign: config cannot change mid-insert;
  -- concurrent retries with the same request ID create only one lead.
  select * into cfg from public.igreen_capture_config where id = 'main' for update;
  if not found or not cfg.enabled or cfg.owner_id is null or cfg.owner_id is distinct from p_expected_owner or cfg.consent_version is distinct from p_consent_version then return 'unavailable'; end if;
  if p_request_id is null or p_lead is null or p_phone_hash is null or p_payload_hash is null or p_consent_text is null
    or not (p_lead ?& array['full_name','phone','city','customer_type','estimated_monthly_bill','solution'])
    or exists (select 1 from jsonb_each(p_lead) where value = 'null'::jsonb)
    or p_consent_version <> 'igreen-2026-10-08-v1' or length(p_consent_text) < 50
    or p_phone_hash !~ '^[a-f0-9]{64}$' or p_payload_hash !~ '^[a-f0-9]{64}$'
    or jsonb_typeof(p_lead->'estimated_monthly_bill') <> 'number'
    or (p_lead->>'estimated_monthly_bill')::numeric not between 1 and 1000000
    or p_lead->>'phone' !~ '^\+55[1-9][0-9](9[0-9]{8}|[2-5][0-9]{7})$'
    or p_lead->>'customer_type' not in ('Residência', 'Empresa', 'Rural')
    or p_lead->>'solution' not in ('Avaliação inicial', 'Conexão Placas', 'Conexão Solar', 'Conexão Green', 'Conexão Livre') then
    raise exception 'invalid capture payload';
  end if;
  select * into receipt from public.igreen_capture_receipts where request_id = p_request_id;
  if found then
    if receipt.payload_hash = p_payload_hash and receipt.owner_id = cfg.owner_id then return 'duplicate'; end if;
    return 'conflict';
  end if;
  insert into public.igreen_capture_limits(bucket, window_start, hits)
    values ('phone:' || p_phone_hash, date_trunc('hour', now()), 1)
  on conflict (bucket, window_start) do update
    set hits = public.igreen_capture_limits.hits + 1
    where public.igreen_capture_limits.hits < 3
  returning hits into n;
  if n is null then return 'rate_limited'; end if;
  insert into public.leads(owner_id, full_name, phone, city, customer_type, estimated_monthly_bill, stage, source, notes, consent_at)
    values (cfg.owner_id, p_lead->>'full_name', p_lead->>'phone', p_lead->>'city', p_lead->>'customer_type',
      (p_lead->>'estimated_monthly_bill')::numeric, 'Novo', 'Landing iGreen', 'Interesse: ' || (p_lead->>'solution'), now())
    returning id into new_lead;
  insert into public.igreen_capture_receipts(request_id, lead_id, owner_id, payload_hash, consent_version, consent_text)
    values (p_request_id, new_lead, cfg.owner_id, p_payload_hash, p_consent_version, p_consent_text);
  return 'created';
end;
$$;
revoke all on function public.igreen_submit_lead(uuid,jsonb,text,text,text,text,uuid) from public, anon, authenticated;
grant execute on function public.igreen_submit_lead(uuid,jsonb,text,text,text,text,uuid) to service_role;
