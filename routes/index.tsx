import Layout from "../components/Layout.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "https://deno.land/std@0.201.0/http/cookie.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const cookies = getCookies(req.headers); // Retrieve all cookies
    const preferredUsername = cookies.username || null; // Get the 'username' cookie or default to null
    const isLoggedIn = !!ctx.state.token; // Check if the user is logged in (based on your token logic)

    // Return data to the frontend with preferredUsername and login status
    return ctx.render({ preferredUsername, isLoggedIn });
  }
};

export default function Home({ data }: PageProps) {
  const { preferredUsername, isLoggedIn } = data;
  console.log("Actor data: ", { preferredUsername, isLoggedIn });

  return (
    <Layout isLoggedIn={isLoggedIn} preferredUsername={preferredUsername}>
      <div class="mt-10 px-5 mx-auto flex max-w-screen-md flex-col justify-center">
        {isLoggedIn ? (
          <div class="mx-auto text-center">
            <h1 class="text-2xl font-bold mb-5">Nice you're logged In!</h1>
            <a
              href="/auth/secret"
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Secret
            </a>
          </div>
        ) : (
          <div class="mx-auto text-center">
            <h1 class="text-2xl font-bold mb-5">Login to access all pages</h1>
            <a
              href="/login"
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Login
            </a>
          </div>
        )}
      </div>
    </Layout>
  );
}
