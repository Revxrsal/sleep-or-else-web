import PageTitle from "~/components/meta/PageTitle";
import Column from "~/components/layout/Column";
import Header from "~/components/typography/Header";
import {FaBrandsApple, FaBrandsMicrosoft} from "solid-icons/fa";
import Pg from "~/components/typography/Pg";
import {VsTerminalLinux} from "solid-icons/vs";
import Flex from "~/components/layout/Flex";
import {createSignal, JSXElement, Match, onMount, Switch} from "solid-js";
import Divider from "~/components/decoration/Divider";

function Platform(props: {
  icon: JSXElement,
  label: string,
  class?: string
}) {
  return (
    <Column center class={`hover:scale-105 cursor-pointer transition-all m-8 ${props.class || ""}`}>
      {props.icon}
      <Pg class={"text-xl lg:text-2xl font-semibold"}>{props.label}</Pg>
    </Column>
  )
}

function Windows() {
  return (
    <Platform
      icon={<FaBrandsMicrosoft size={72} class="m-8 fill-stone-800 dark:fill-yellow-200"/>}
      label="Download for Windows"
    />
  )
}

function MacOS() {
  return (
    <Platform
      icon={<FaBrandsApple size={72} class="m-8 fill-stone-800 dark:fill-yellow-200"/>}
      label="Download for macOS"
    />
  )
}

function Linux() {
  return (
    <Platform
      icon={<VsTerminalLinux size={72} class="m-8 fill-stone-800 dark:fill-yellow-200"/>}
      label="Download for Linux"
    />
  )
}

export default function Download() {
  const [operatingSystem, setOperatingSystem] = createSignal("Windows");
  onMount(async () => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf("win") !== -1) {
      setOperatingSystem("Windows");
    } else if (userAgent.indexOf("mac") !== -1) {
      setOperatingSystem("macOS");
    } else if (userAgent.indexOf("linux") !== -1) {
      setOperatingSystem("Linux");
    } else {
      setOperatingSystem("Unknown")
    }
  })
  return (
    <main>
      <Column class={"center"}>
        <PageTitle>Download</PageTitle>
        <Header class={"text-center"}>
          Download
        </Header>
        <Flex class={"flex-col lg:flex-row justify-around lg:w-full"}>

          <Column class={"center w-full"}>
            <Switch>
              <Match when={operatingSystem() == "Windows"}>
                <Windows/>
                <Divider class={"px-8 mx-8 my-12 w-full"}/>
                <Flex class={"flex-col lg:flex-row lg:w-2/3 justify-around"}>
                  <MacOS/>
                  <Linux/>
                </Flex>
              </Match>

              <Match when={operatingSystem() == "macOS"}>
                <MacOS/>
                <Divider class={"mx-8 my-12 w-full"}/>
                <Flex class={"flex-col lg:flex-row lg:w-2/3 justify-around"}>
                  <Windows/>
                  <Linux/>
                </Flex>
              </Match>

              <Match when={operatingSystem() == "Linux"}>
                <Linux/>
                <Divider class={"mx-8 my-12 w-full"}/>
                <Flex class={"flex-col lg:flex-row lg:w-2/3 justify-around"}>
                  <Windows/>
                  <MacOS/>
                </Flex>
              </Match>
            </Switch>
          </Column>

        </Flex>
      </Column>
    </main>
  )
}