// @refresh reload
import {Router} from "@solidjs/router";
import {FileRoutes} from "@solidjs/start";
import {createSignal, JSXElement, onMount, Show, Suspense} from "solid-js";
import "./app.css";
import Row from "./components/layout/Row";
import {SignUpButton} from "~/components/input/SignUpButton";
import {MetaProvider} from "@solidjs/meta";
import Pg from "~/components/typography/Pg";
import Spacer from "~/components/decoration/Spacer";
import {inject} from '@vercel/analytics';
import Column from "~/components/layout/Column";
import Cross from "~/components/icons/Cross";

function NavBar(props: { children: JSXElement }) {
  return (
    <nav class={"w-full dark:bg-stone-900 lg:flex flex-row justify-between text-lg"}>
      {props.children}
    </nav>
  )
}

function LinksAsList() {
  return (
    <>
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
    </>
  );
}

function AppLogo() {
  return (
    <a href="/">
      <Row class={"flex w-fit justify-between m-6 cursor-pointer"}>
        <img src="/logo.png" alt="App logo" class={"w-14 h-14 drop-shadow-lg"}/>
        <Spacer class={"mx-2"}/>
        <Pg class={"hidden lg:flex font-semibold text-2xl"}>Sleep, or else...</Pg>
      </Row>
    </a>
  );
}

function ExpandNavBarButton(props: { onClick: () => void }) {
  return <div class="lg:hidden px-4" onClick={props.onClick}>
    <button class="navbar-burger flex items-center text-on-bg p-3">
      <svg class="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Mobile menu</title>
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
      </svg>
    </button>
  </div>;
}

function ExpandedNavBarMenu(props: { onDismiss: () => void }) {
  return <Column class={"lg:hidden fixed right-0 bottom-0 min-h-full z-[999] dark:bg-stone-800 p-8"}>
    <Cross class={"m-4 fill-stone-800 dark:fill-stone-200 z-[999] cursor-pointer"} onClick={props.onDismiss}/>
    <LinksAsList/>
  </Column>;
}

export default function App() {
  onMount(inject);
  const [expandNavBar, setExpandNavBar] = createSignal(false)
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Row class={"justify-between"}>
            <NavBar>
              <AppLogo/>
              <Row class={"hidden lg:flex"}>
                <LinksAsList/>
              </Row>
            </NavBar>
            <ExpandNavBarButton onClick={() => setExpandNavBar(v => !v)}/>
            <Show when={expandNavBar()}>
              <ExpandedNavBarMenu onDismiss={() => setExpandNavBar(false)}/>
            </Show>
          </Row>
          <div onClick={() => setExpandNavBar(false)}>
            <Suspense>{props.children}</Suspense>
          </div>
        </MetaProvider>
      )}
    >
      <FileRoutes/>
    </Router>
  );
}
