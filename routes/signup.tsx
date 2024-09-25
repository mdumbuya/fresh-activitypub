import * as uuid from "jsr:@std/uuid";
import { setCookie } from "https://deno.land/std@0.201.0/http/cookie.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { State } from "./_middleware.ts";

export const handler: Handlers<any, State> = {
  async POST(req, ctx) {
    const form = await req.formData();
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    const preferredUsername = form.get("username") as string;
    const displayName = form.get("displayName") as string;

    const { data, error } = await ctx.state.supabaseClient.auth.signUp({ email, password });
    const headers = new Headers();

    if (data.session) {
      setCookie(headers, {
        name: 'supaLogin',
        value: data.session.access_token,
        maxAge: data.session.expires_in,
        httpOnly: true,  // Ensure the cookie is HTTP only for security
        secure: true,    // Ensure the cookie is only sent over HTTPS
      });

      // Save the username in a cookie
      setCookie(headers, {
        name: 'username',
        value: preferredUsername,
        maxAge: 60 * 60 * 24 * 7, // 1 week expiration
        httpOnly: false, // This cookie can be accessed by client-side JavaScript
        secure: true,    // Ensure the cookie is only sent over HTTPS
      });

      // Try generating UUID using alternative module
      const actorId = uuid.v1.generate();  
      console.log('Generated UUID:', actorId);  // Log the generated UUID to confirm

      const actor = {
        id: actorId,  // Set the id manually with UUID
        '@context': 'https://www.w3.org/ns/activitystreams',
        'type': 'Person',
        'preferredUsername': preferredUsername,
        'inbox': `/inbox/${preferredUsername}`,
        'outbox': `/outbox/${preferredUsername}`,
        'followers': `/followers/${preferredUsername}`,
        'following': `/following/${preferredUsername}`,
        'publicKey': { publicKeyPem: 'YourPublicKeyHere' },  // Adjust as needed
        'displayName': displayName,
      };

      // Insert actor into the database
      const { error: insertError } = await ctx.state.supabaseClient
        .from('actors')
        .insert(actor);

      if (insertError) {
        console.error('Error inserting actor:', insertError.message);
        headers.set('location', `/signup?error=${insertError.message}`);
        return new Response(null, { status: 303, headers });
      }

      // Redirect to user's profile after successful signup
      headers.set('location', `/auth/users/${preferredUsername}`);
    } else {
      headers.set('location', `/signup?error=${error?.message}`);
    }

    return new Response(null, { status: 303, headers });
  },
};



export default function SignUp(props: PageProps) {
  const err = props.url.searchParams.get("error");

  return (
    <section class="bg-gray-200">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="mx-auto">
          <h2 class="text-2xl font-bold mb-5 text-center">Create Account</h2>
        </div>

        <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            {err && (
              <div class="bg-red-400 border-l-4 p-4" role="alert">
                <p class="font-bold">Error</p>
                <p>{err}</p>
              </div>
            )}
            <form class="space-y-4 md:space-y-6" method="POST">
              <div>
                <label for="email" class="block mb-2 text-sm font-medium">Your email</label>
                <input type="email" name="email" id="email" class="border border-gray-300 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="name@company.com" />
              </div>
              <div>
                <label for="password" class="block mb-2 text-sm font-medium">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••" class="border border-gray-300 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" />
              </div>
              <div>
                <label for="username" class="block mb-2 text-sm font-medium">Username</label>
                <input type="text" name="username" id="username" class="border border-gray-300 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="Preferred username" />
              </div>
              <div>
                <label for="displayName" class="block mb-2 text-sm font-medium">Name to Display</label>
                <input type="text" name="displayName" id="displayName" class="border border-gray-300 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="Full name or display name" />
              </div>
              
              <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign Up</button>
              <p class="text-sm font-light text-gray-500">
                Already have an Account? <a href="/login" class="font-medium text-blue-600 hover:underline">Login</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}