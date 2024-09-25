import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { getCookies } from "https://deno.land/std@0.201.0/http/cookie.ts";
import { State } from "../_middleware.ts";

export async function handler(req: Request, ctx: MiddlewareHandlerContext<State>) {
  const cookies = getCookies(req.headers);
  const preferredUsername = cookies.username || null;  // Retrieve username from cookies if available

  // Store the preferred username in the state
  ctx.state.preferredUsername = preferredUsername;

  const response = await ctx.next();
  
  if (!ctx.state.token) {
    const headers = new Headers();
    headers.set("location", "/login");
    return new Response(null, {
      
      status: 303,
      headers,
    });
  }
  
  return response;
}