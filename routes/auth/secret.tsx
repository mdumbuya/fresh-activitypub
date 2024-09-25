import Layout from "../../components/Layout.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const preferredUsername = ctx.state.preferredUsername;
    return ctx.render({ preferredUsername });
  }
};

export default function Secret({ data }: PageProps) {

    const { preferredUsername } = data;

    return (
        <Layout isLoggedIn={true} preferredUsername={preferredUsername}>
            <div class="mt-10 px-5 mx-auto flex max-w-screen-md flex-col justify-center">
                <h1 class="text-2xl font-bold mb-5 text-center">This route is protected!</h1>
                <img class="mx-auto mt-10" src="/walking_in_rain.svg" alt="" />
            </div>
        </Layout>
    );
}