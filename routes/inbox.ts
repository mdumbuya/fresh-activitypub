// routes/inbox.ts
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    const activity = await req.json();
    // Handle incoming activity
    return new Response("Activity received", { status: 200 });
  }
};