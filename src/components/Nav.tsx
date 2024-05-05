import { useLocation } from "@solidjs/router";
import { Match, Show, Switch, createEffect, useContext } from "solid-js";
import { StoreContext } from "~/store";

export default function Nav() {
  const [store, setStore] = useContext(StoreContext);
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname
      ? "border-sky-600"
      : "border-transparent hover:border-sky-600";

  createEffect(() => {
    console.log(store);
  });

  return (
    <nav class="bg-sky-800">
      <ul class="container flex items-center p-3 text-gray-200">
        <li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
          <a href="/">Home</a>
        </li>
        <li class={`border-b-2 ${active("/about")} mx-1.5 sm:mx-6`}>
          <a href="/about">About</a>
        </li>

        <Switch>
          <Match when={!store.loggedIn}>
            <li class={`border-b-2 ${active("/sign-in")} mx-1.5 sm:mx-6`}>
              <a href="/dashboard">Sign In</a>
            </li>
          </Match>
          <Match when={store.loggedIn}>
            <li class={`border-b-2 ${active("/dashboard")} mx-1.5 sm:mx-6`}>
              <a href="/dashboard">Dashboard</a>
            </li>
            <li class={`mx-1.5 sm:mx-6`}>
              <a
                href="/"
                onClick={() => {
                  setStore("user", null);
                  setStore("loggedIn", false);
                }}
              >
                Log out
              </a>
            </li>
          </Match>
        </Switch>
      </ul>
      <Show when={store.loggedIn}>
        <div class="py-3 px-[18px] sm:px-9  text-gray-200">
          <span>{store.user?.username}</span> user is logged in{" "}
        </div>
      </Show>
    </nav>
  );
}
