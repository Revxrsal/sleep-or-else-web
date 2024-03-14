import PageTitle from "~/components/meta/PageTitle";
import Column from "~/components/layout/Column";
import Header from "~/components/typography/Header";
import {FaBrandsApple, FaBrandsMicrosoft} from "solid-icons/fa";
import Flex from "~/components/layout/Flex";
import {createSignal, Match, onMount, Switch} from "solid-js";
import Divider from "~/components/decoration/Divider";
import DownloadURL from "~/components/input/DownloadURL";

const VERSION = "1.0.0"

function createDownloadURL(extension: string) {
  return `https://github.com/Sleep-or-else/Issues/releases/download/${VERSION}/Sleep.or.else-${VERSION}.${extension}`
}

function Windows() {
  return (
    <DownloadURL
      icon={<FaBrandsMicrosoft size={72} class="m-8 fill-stone-800 dark:fill-yellow-200"/>}
      label="Download for Windows"
      downloadURL={createDownloadURL("msi")}
    />
  )
}

function MacOS() {
  return (
    <DownloadURL
      icon={<FaBrandsApple size={72} class="m-8 fill-stone-800 dark:fill-yellow-200"/>}
      label="Download for macOS"
      downloadURL={createDownloadURL("dmg")}
    />
  )
}

// function Linux() {
//   return (
//     <DownloadURL
//       icon={<VsTerminalLinux size={72} class="m-8 fill-stone-800 dark:fill-yellow-200"/>}
//       label="Download for Linux"
//     />
//   )
// }

export default function Download() {
  const [operatingSystem, setOperatingSystem] = createSignal("Windows");
  onMount(async () => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf("win") !== -1) {
      setOperatingSystem("Windows");
    } else if (userAgent.indexOf("mac") !== -1) {
      setOperatingSystem("macOS");
    // } else if (userAgent.indexOf("linux") !== -1) {
    //   setOperatingSystem("Linux");
    } else {
      setOperatingSystem("Unknown")
    }
  })
  return (
    <main class={"pb-8"}>
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
                  {/*<Linux/>*/}
                </Flex>
              </Match>

              <Match when={operatingSystem() == "macOS"}>
                <MacOS/>
                <Divider class={"mx-8 my-12 w-full"}/>
                <Flex class={"flex-col lg:flex-row lg:w-2/3 justify-around"}>
                  <Windows/>
                  {/*<Linux/>*/}
                </Flex>
              </Match>

              <Match when={operatingSystem() == "Linux"}>
                {/*<Linux/>*/}
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