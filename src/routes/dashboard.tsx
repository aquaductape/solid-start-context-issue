import { cache, createAsync, redirect } from "@solidjs/router";
import { Show, Suspense, createEffect, createMemo, useContext } from "solid-js";
import { isServer } from "solid-js/web";
import Nav from "~/components/Nav";
import { StoreContext } from "~/store";

const getUser = cache(async () => {
  "use server";
  await new Promise((resolve) => setTimeout(() => resolve(true), 2000));
  // throw redirect("/about");
  // return null;
  return {
    username: "SNOW_BOi",
    email: "snow@gmail.com",
  };
}, "get-user");

// export default function Dashboard() {
const Dashboard = () => {
  const res = createAsync(() => getUser(), { deferStream: true });
  const [store, setStore] = useContext(StoreContext);

  if (isServer) {
    // logs
    // 1 server:  undefined
    // 2 server:  { username: 'snow', email: 'snow@gmail.com' }
    console.log("server: ", res());
  }

  // makes sure that this page response is populated with user values, ie "View Page Source"
  // I would have expected that deferStream guarantees Dashboard section to be populated since the function component reruns based on createAsync
  createMemo(() => {
    if (!res()) return;
    // running on this on the client causes hydration issues on StoreContext that is used on ancestors or neighbors components relative to this Dashboard component
    if (isServer) {
      setStore("user", res()!);
      setStore("loggedIn", true);
    }
  });

  createEffect(() => {
    if (!res()) return;

    setStore("user", res()!);
    setStore("loggedIn", true);
  });

  return (
    <div>
      {/* <Nav /> */}
      <h1>Dashboard</h1>
      <Show when={res() && store.user}>
        <p>{store.user!.username}</p>
        <p>{store.user!.email}</p>
        <label>
          <span>Update username: </span>
          <input
            type="text"
            style="border: solid 1px grey"
            onInput={(e) => {
              setStore("user", "username", e.currentTarget.value);
            }}
            value={store.user!.username}
          />
        </label>
      </Show>
    </div>
  );
};

export default () => {
  return (
    <>
      {/* <Nav /> */}
      <Dashboard />
    </>
  );
};
