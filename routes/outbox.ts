// routes/outbox.ts
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    // Retrieve and return activities
    const activities = []; // Fetch activities from your database
    return new Response(JSON.stringify(activities), {
      headers: { "Content-Type": "application/json" },
    });
  }
};