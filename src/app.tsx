// @refresh reload
import {Router} from "@solidjs/router";
import {FileRoutes} from "@solidjs/start";
import {onMount, Suspense} from "solid-js";
import "./app.css";
import Row from "./components/layout/Row";
import {SignUpButton} from "~/components/input/SignUpButton";
import {MetaProvider} from "@solidjs/meta";
import Pg from "~/components/typography/Pg";
import Spacer from "~/components/decoration/Spacer";
import {inject} from '@vercel/analytics';

export default function App() {
  onMount(inject);
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <nav class={"w-full bg-opacity-10 bg-gray-300 dark:bg-stone-900 flex flex-row justify-between text-lg"}>
            <Row class={"justify-between m-4"}>
              <img src="/logo.png" alt="App logo" class={"w-12 h-12 drop-shadow-lg"}/>
              <Spacer class={"mx-2"}/>
              <Pg class={"font-semibold"}>Sleep, or else...</Pg>
            </Row>
            <Row>
              <a href="/">
                <Pg class={"p-4 font-semibold"}>Home</Pg>
              </a>
              <a href="/features">
                <Pg class={"p-4 font-semibold"}>Features</Pg>
              </a>
              <a href="/pricing">
                <Pg class={"p-4 font-semibold"}>Pricing</Pg>
              </a>
              <SignUpButton class={"mx-0 my-0 font-semibold scale-[75%]"}/>
            </Row>
          </nav>
          <Suspense>{props.children}</Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes/>
    </Router>
  );
}
