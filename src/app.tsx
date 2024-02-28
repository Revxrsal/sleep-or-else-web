// @refresh reload
import {Router, useLocation, useNavigate} from "@solidjs/router";
import {FileRoutes} from "@solidjs/start";
import {
  Accessor,
  ComponentProps,
  createEffect,
  createSignal,
  JSXElement,
  onMount,
  Setter,
  Show,
  splitProps,
  Suspense
} from "solid-js";
import "./app.css";
import Row from "./components/layout/Row";
import {SignUpButton} from "~/components/input/SignUpButton";
import {MetaProvider} from "@solidjs/meta";
import Pg from "~/components/typography/Pg";
import Spacer from "~/components/decoration/Spacer";
import {inject} from '@vercel/analytics';
import Column from "~/components/layout/Column";
import Cross from "~/components/icons/Cross";
import {SupabaseProvider} from "solid-supabase";
import {createSupabaseClient} from "~/database/client";
import {NavBar} from "~/components/nav/NavBar";
import {createSupabaseSessionResource} from "~/database/primitives";
import {createDarkModeSignal, DarkModeContext, useDarkMode} from "~/util/theme";
import IconButton from "./components/input/IconButton";
import {FaSolidMoon} from "solid-icons/fa";
import {BsSunFill} from "solid-icons/bs";
import Footer from "./components/nav/Footer";
import {Session} from "@supabase/supabase-js";
import {injectSpeedInsights} from "@vercel/speed-insights";

function NoImage(props: {
  value: string,
  class?: string
} & ComponentProps<"div">) {
  const [local, divProps] = splitProps(props, ["value", "class"])
  return (
    <Row class={`bg-emerald-800 dark:bg-emerald-300 justify-center align-middle ${local.class || ""}`} {...divProps}>
    <span class={`text-xl text-center`}>
      {local.value.toUpperCase()}
    </span>
    </Row>
  )
}

function UserImage(props: {
  session: Session | null | undefined,
  class?: string,
  onClick?: () => void
}): JSXElement {
  if (props.session) {
    const meta = props.session.user.user_metadata
    if (meta) {
      const avatarUrl = meta.avatar_url as string | undefined
      if (avatarUrl) {
        return <img src={avatarUrl} {...props} alt="Avatar"/>
      } else if (meta.full_name) {
        const firstChar = meta.full_name[0]
        return <NoImage value={firstChar} class={props.class} onClick={props.onClick}/>
      }
    }
    const firstChar = props.session.user.email![0]
    return <NoImage value={firstChar} class={props.class}/>
  }
}

function LinksAsList() {
  const session = createSupabaseSessionResource()
  const navigate = useNavigate()
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

      <a href="/download">
        <Pg class={"p-4 font-semibold"}>Download</Pg>
      </a>

      <Show when={session() != null} fallback={
        <SignUpButton class={"mx-0 my-0 font-semibold scale-[75%]"}/>
      }>
        <UserImage
          class={`mx-4 w-12 h-12
           rounded-md 
           text text-on-container 
           select-none cursor-pointer`
          }
          session={session()}
          onClick={() => navigate("/account")}
        />
      </Show>
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
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
      </svg>
    </button>
  </div>;
}

function ExpandedNavBarMenu(props: { onDismiss: () => void }) {
  return <Column class={"lg:hidden fixed right-0 bottom-0 min-h-full z-[999] dark:bg-stone-800 p-8"}>
    <Cross class={"m-4 mt-0 fill-stone-800 dark:fill-stone-200 cursor-pointer"} onClick={props.onDismiss}/>
    <LinksAsList/>
  </Column>;
}

const supabaseClient = createSupabaseClient()

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useDarkMode()
  createEffect(() => {
    const root = document.getElementsByTagName("html")[0];
    const body = document.getElementsByTagName("body")[0]
    if (darkMode())
      root.classList.add("dark")
    else
      root.classList.remove("dark")
    if (!body.classList.contains("transition-all"))
      body.classList.add("transition-all")
  })
  return (
    <IconButton class={"me-4"} onClick={() => setDarkMode(v => !v)}>
      <Show when={!darkMode()} fallback={
        <FaSolidMoon class={"text-yellow-800 dark:text-yellow-200"} size={32}/>
      }>
        <BsSunFill class={"text-yellow-800 dark:text-yellow-200"} size={32}/>
      </Show>
    </IconButton>
  )
}

function AppNavBar(props: {
  expanded: Accessor<boolean>,
  setExpanded: Setter<boolean>
}) {
  const location = useLocation()
  const showNavbar = () => !location.pathname.startsWith("/blocked")
  return (
    <Row class={"justify-between"}>
      <Show when={showNavbar()}>
        <NavBar>
          <AppLogo/>
          <Row class={"hidden lg:flex"}>
            <LinksAsList/>
          </Row>
        </NavBar>
        <DarkModeToggle/>
        <ExpandNavBarButton onClick={() => props.setExpanded(v => !v)}/>
        <Show when={props.expanded()}>
          <ExpandedNavBarMenu onDismiss={() => props.setExpanded(false)}/>
        </Show>
      </Show>
    </Row>
  )
}

export default function App() {
  onMount(async () => {
    inject()
    injectSpeedInsights()
  });
  const [darkMode, setDarkMode] = createDarkModeSignal()
  const [expandNavBar, setExpandNavBar] = createSignal(false)

  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <DarkModeContext.Provider value={[darkMode, setDarkMode]}>
            <SupabaseProvider client={supabaseClient}>
              <AppNavBar expanded={expandNavBar} setExpanded={setExpandNavBar}/>
              <div onClick={() => setExpandNavBar(false)}>
                <Suspense>{props.children}</Suspense>
              </div>
              <Footer/>
            </SupabaseProvider>
          </DarkModeContext.Provider>
        </MetaProvider>
      )}
    >
      <FileRoutes/>
    </Router>
  );
}
