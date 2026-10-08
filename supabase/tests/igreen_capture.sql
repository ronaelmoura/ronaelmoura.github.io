-- Run as project SQL administrator. Entire test is rolled back, including leads,
-- quotas, consent receipts and the temporary enable flag. No messages are sent.
begin;
update public.igreen_capture_config set enabled=true, turnstile_site_key='0xtest-only-inside-rollback' where id='main';
set local role service_role;
do $$
declare owner uuid; req uuid := gen_random_uuid(); outcome text; i integer;
  payload jsonb := '{"full_name":"TESTE TRANSACIONAL IGREEN","phone":"+5586999999999","city":"Tianguá","customer_type":"Empresa","estimated_monthly_bill":650,"solution":"Avaliação inicial"}';
begin
  select owner_id into owner from public.igreen_capture_config where id='main';
  if owner is null then raise exception 'configure an owner before testing'; end if;
  outcome := public.igreen_submit_lead(req,payload,repeat('a',64),repeat('b',64),'igreen-2026-10-08-v1',repeat('Consentimento de teste ',5),owner);
  if outcome <> 'created' then raise exception 'create failed: %',outcome; end if;
  outcome := public.igreen_submit_lead(req,payload,repeat('a',64),repeat('b',64),'igreen-2026-10-08-v1',repeat('Consentimento de teste ',5),owner);
  if outcome <> 'duplicate' then raise exception 'idempotency failed'; end if;
  outcome := public.igreen_submit_lead(req,payload,repeat('a',64),repeat('c',64),'igreen-2026-10-08-v1',repeat('Consentimento de teste ',5),owner);
  if outcome <> 'conflict' then raise exception 'payload conflict failed'; end if;
  for i in 1..2 loop
    outcome := public.igreen_submit_lead(gen_random_uuid(),payload,repeat('a',64),repeat('b',64),'igreen-2026-10-08-v1',repeat('Consentimento de teste ',5),owner);
    if outcome <> 'created' then raise exception 'phone quota early block'; end if;
  end loop;
  outcome := public.igreen_submit_lead(gen_random_uuid(),payload,repeat('a',64),repeat('b',64),'igreen-2026-10-08-v1',repeat('Consentimento de teste ',5),owner);
  if outcome <> 'rate_limited' then raise exception 'phone quota failed'; end if;
  outcome := public.igreen_submit_lead(gen_random_uuid(),payload,repeat('d',64),repeat('b',64),'igreen-2026-10-08-v1',repeat('Consentimento de teste ',5),gen_random_uuid());
  if outcome <> 'unavailable' then raise exception 'owner race guard failed'; end if;
  perform set_config('igreen.test_lead',(select lead_id::text from public.igreen_capture_receipts where request_id=req),true);
  perform set_config('igreen.test_owner',owner::text,true);
  if (select consent_at is null from public.leads where id=current_setting('igreen.test_lead')::uuid) then raise exception 'consent not recorded'; end if;
  delete from public.igreen_capture_limits where bucket='global';
  for i in 1..60 loop
    if not public.igreen_take_request_slot() then raise exception 'global quota early block'; end if;
  end loop;
  if public.igreen_take_request_slot() then raise exception 'global quota failed'; end if;
end;
$$;
reset role;
select set_config('request.jwt.claim.sub',current_setting('igreen.test_owner'),true);
set local role authenticated;
do $$ begin
  if (select count(*) from public.leads where id=current_setting('igreen.test_lead')::uuid) <> 1 then raise exception 'owner cannot see lead'; end if;
  begin
    perform public.igreen_take_request_slot();
    raise exception 'authenticated called private RPC';
  exception when insufficient_privilege then null; end;
  begin
    update public.leads set owner_id=gen_random_uuid() where id=current_setting('igreen.test_lead')::uuid;
    raise exception 'owner reassignment allowed';
  exception when insufficient_privilege then null; end;
end $$;
reset role;
select set_config('request.jwt.claim.sub',gen_random_uuid()::text,true);
set local role authenticated;
do $$ begin
  if (select count(*) from public.leads where id=current_setting('igreen.test_lead')::uuid) <> 0 then raise exception 'cross-owner leak'; end if;
  update public.leads set notes='unauthorized' where id=current_setting('igreen.test_lead')::uuid;
  if found then raise exception 'cross-owner write'; end if;
  begin
    perform * from public.igreen_capture_receipts;
    raise exception 'receipt exposure';
  exception when insufficient_privilege then null; end;
end $$;
reset role;
set local role anon;
do $$ begin
  begin
    perform * from public.igreen_capture_config;
    raise exception 'anonymous config access';
  exception when insufficient_privilege then null; end;
  begin
    perform public.igreen_submit_lead(gen_random_uuid(),'{}'::jsonb,'a','b','c','d',gen_random_uuid());
    raise exception 'anonymous RPC access';
  exception when insufficient_privilege then null; end;
end $$;
reset role;
rollback;
select 'PASS: transactional insert, consent, retry, quotas, owner binding and RLS; all test changes rolled back' as result;
