import { Handlers, PageProps } from "$fresh/server.ts";
import { State } from "../../_middleware.ts"; // Adjust the path if needed
import Layout from "../../../components/Layout.tsx";

export const handler: Handlers<any, State> = {
  async GET(_, ctx) {
    const { username } = ctx.params;

    // Fetch the actor data from Supabase
    const { data: actor, error } = await ctx.state.supabaseClient
      .from('actors')
      .select('*')
      .eq('preferredUsername', username)
      .single();

    if (error) {
      return new Response("User not found", { status: 404 });
    }

    return ctx.render({ actor });
  }
};

export default function UserProfile({ data }: PageProps) {
  const { actor } = data;

  return (
    <Layout isLoggedIn={true} username={actor.preferredUsername}>
        <section class="bg-gray-200">
          <div class="container mx-auto py-8">
            <div class="bg-white shadow-lg rounded-lg p-6">
              <h1 class="text-3xl font-bold mb-6">Profile of {actor.displayName}</h1>
              <p><strong>Username:</strong> {actor.preferredUsername}</p>
              <p><strong>Inbox:</strong> <a href={actor.inbox}>{actor.inbox}</a></p>
              <p><strong>Outbox:</strong> <a href={actor.outbox}>{actor.outbox}</a></p>
              <p><strong>Followers:</strong> <a href={actor.followers}>{actor.followers}</a></p>
              <p><strong>Following:</strong> <a href={actor.following}>{actor.following}</a></p>
              <p><strong>Public Key:</strong></p>
              <pre class="bg-gray-100 p-4 rounded-lg">{actor.publicKey.publicKeyPem}</pre>
            </div>
          </div>
        </section>
    </Layout>
  );
}
