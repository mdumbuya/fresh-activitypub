import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { getCookies } from "https://deno.land/std@0.201.0/http/cookie.ts";
import { SupabaseClient, createClient } from "@supabase/supabase-js";

export interface State {
    preferredUsername: string | null;
    token: string | null;
    supabaseClient : SupabaseClient<any, "public", any>;
}


export async function handler(req: Request, ctx: MiddlewareHandlerContext<State>) {
  const client = createClient(Deno.env.get("SUPABASE_URL") || "", Deno.env.get("SUPABASE_KEY") || "")

  ctx.state.supabaseClient = client;

  const supaCreds = getCookies(req.headers)["supaLogin"]

  if (!supaCreds) {
    return ctx.next();
  }

  const {error} = await client.auth.getUser(supaCreds)

  if (error) {
    console.log(error.message)
    ctx.state.token = null;
  } else {
    ctx.state.token = supaCreds
  }

  return await ctx.next();
}