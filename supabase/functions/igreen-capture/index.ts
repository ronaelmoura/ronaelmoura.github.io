import { createHandler } from './handler.ts';

// Public form: custom authorization is server-verified Turnstile + server-owned
// campaign config + service-only RPCs. No Supabase client key is sent by visitors.
Deno.serve(createHandler((name) => Deno.env.get(name)));
