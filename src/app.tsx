import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "~/components/Nav";
import "./app.css";
import { StoreProvider } from "./store";

export default function App() {
  return (
    <Router
      root={(props) => (
        <>
          <StoreProvider>
            <Nav />
            <Suspense>{props.children}</Suspense>
          </StoreProvider>
        </>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
