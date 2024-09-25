import { Head } from "$fresh/runtime.ts";
import type { ComponentChildren } from "preact";
import Nav from "./Nav.tsx";

interface LayoutProps {
    isLoggedIn: boolean;
    preferredUsername?: string;  // Add preferredUsername as an optional prop
    children: preact.ComponentChildren;
}

export default function Layout(props: LayoutProps) {
    return (
        <>
            <head>
                <title>Fresh Auth</title>
            </head>
            <Nav loggedIn={props.isLoggedIn} username={props.preferredUsername}/>
            <div class="p-4 mx-auto max-w-screen-md">
                {props.children}
            </div>
        </>
    );
}