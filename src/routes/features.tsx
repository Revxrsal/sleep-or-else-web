import Header from "~/components/typography/Header";
import Pg from "~/components/typography/Pg";
import {JSXElement, Show} from "solid-js";
import Row from "~/components/layout/Row";
import Column from "~/components/layout/Column";
import Divider from "~/components/decoration/Divider";
import Spacer from "~/components/decoration/Spacer";
import Badge from "~/components/decoration/Badge";
import {SignUpButton} from "~/components/input/SignUpButton";
import {DisplayScreenshotWithFeatures} from "~/components/layout/DisplayScreenshotWithFeatures";
import Check from "~/components/icons/Check";
import PageTitle from "~/components/meta/PageTitle";
import Flex from "~/components/layout/Flex";
import Button from "~/components/input/Button";
import {createSupabaseSessionResource} from "~/database/primitives";
import {useNavigate} from "@solidjs/router";

function Bullet() {
  return <span class={"font-bold"}>•</span>
}

function Feature(props: {
  children: JSXElement
}) {
  return (
    <Pg class={"ms-10 mt-5 text-xl"}>
      <Bullet/> {props.children}
    </Pg>
  )
}

function Platform(props: { children: JSXElement }) {
  return (
    <Row class={"mx-10 mt-5 align-middle center"}>
      <Check class={"mx-2 fill-green-600 dark:fill-green-500"}/>
      <Pg class={"text-lg"}>{props.children}</Pg>
    </Row>
  )
}

export default function Features() {
  const session = createSupabaseSessionResource()
  const navigate = useNavigate()
  let alternateIndex = 0
  return (
    <main class={"pt-4 mt-4 px-4"}>
      <PageTitle>Feature list</PageTitle>
      <Header class={"text-center my-0"}>
        Features
      </Header>
      <Divider class={"mx-8 my-12"}/>

      <DisplayScreenshotWithFeatures
        alternateIndex={alternateIndex++}
        image={<img src="https://i.imgur.com/Q4HLPXA.png" alt="Blocks" class={""}/>}
      >
        <Column>
          <Header class={"text-center my-4"} size={4}>
            Leave no wiggle room
          </Header>
          <Feature>Forcibly shut-down your computer when it's sleep time</Feature>
          <Feature>Block applications and keywords</Feature>
          <Feature>Block websites and keywords</Feature>
          <Feature>Choose whether you'd like to minimize apps or exit them</Feature>
          <Feature>Ability to switch between whitelist and blacklist mode </Feature>
        </Column>
      </DisplayScreenshotWithFeatures>

      <Spacer class={"my-8"}/>

      <DisplayScreenshotWithFeatures
        alternateIndex={alternateIndex++}
        image={<img src="https://i.imgur.com/G0WJfTq.png" alt="Restrictions" class={""}/>}
      > <Column>
        <Header class={"text-center my-4"} size={4}>
          Customize the restrictiveness
        </Header>
        <Feature>Block the task manager</Feature>
        <Feature>Block terminal apps</Feature>
        <Feature>Block system settings</Feature>
        <Feature>Block the uninstaller</Feature>
        <Feature>Block the system registry</Feature>
        <Feature>Block the ability to modify the app settings</Feature>
      </Column>
      </DisplayScreenshotWithFeatures>

      <Spacer class={"my-8"}/>

      <DisplayScreenshotWithFeatures
        alternateIndex={alternateIndex++}
        image={<img src={"https://i.imgur.com/V9RlpLV.png"} alt="Create rituals"
                    class={"rounded-lg drop-shadow-2xl"}/>}>
        <Column>
          <Row class={"items-center"}>
            <Header class={"text-center my-4 me-6"} size={4}>
              Fix your sleep schedule
            </Header>
          </Row>
          <Feature>Shift your bedtime by a little everyday</Feature>
          <Feature>Or, set a strict bedtime</Feature>
          <Feature>Know how much it will take to fix your sleep schedule</Feature>
        </Column>
      </DisplayScreenshotWithFeatures>

      <Spacer class={"my-8"}/>

      <DisplayScreenshotWithFeatures
        alternateIndex={alternateIndex++}
        image={<img src={"https://i.imgur.com/I5nAncK.png"} alt="Cross-platform" class={"rounded-lg"}/>}>
        <Column>
          <Row class={"items-center"}>
            <Header class={"text-center my-4 me-6"} size={4}>
              Cross-platform
            </Header>
          </Row>

          <Platform>
            Tested on Windows 11
          </Platform>
          <Platform>
            Tested on macOS Ventura
          </Platform>
        </Column>
      </DisplayScreenshotWithFeatures>

      <Divider class={"mx-8 mt-12"}/>

      <Header class={"text-center"}>Not convinced yet?</Header>
      <Pg class={"text-center text-xl text-yellow-800 dark:text-yellow-200 mx-8"}>
        Get <span class={"font-bold"}>14 days</span> of free trial in any of our subscription plans
      </Pg>
      <Flex class={"flex-col lg:flex-row px-3 items-center justify-center center m-8 scale-[85%] lg:scale-100"}>
        <Show when={session() == null}>
          <SignUpButton/>
        </Show>
        <Button onClick={() => {
          navigate("/pricing")
        }}>See our plans</Button>
      </Flex>
    </main>
  )
}