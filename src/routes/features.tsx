import Header from "~/components/typography/Header";
import Pg from "~/components/typography/Pg";
import {JSXElement} from "solid-js";
import Row from "~/components/layout/Row";
import Column from "~/components/layout/Column";
import Divider from "~/components/decoration/Divider";
import Spacer from "~/components/decoration/Spacer";
import Badge from "~/components/decoration/Badge";
import {SignUpButton} from "~/components/input/SignUpButton";

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

export default function Features() {
  return (
    <main class={"pt-4 mt-4 px-4"}>
      <title>Feature list - Sleep or else</title>
      <Header class={"text-center my-0"}>
        Features
      </Header>
      <Divider class={"mx-8 my-12"}/>
      <Row class={"justify-around"}>
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
        <img src="https://i.imgur.com/jVoLkGI.png" alt="Blocks" class={"w-1/2"}/>
      </Row>

      <Spacer class={"my-8"}/>

      <Row class={"justify-around"}>
        <img src="https://i.imgur.com/k5BvFCX.png" alt="Restrictions" class={"w-1/2"}/>
        <Column>
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
      </Row>

      <Spacer class={"my-8"}/>

      <Row class={"justify-around"}>
        <Column class={"items-center"}>
          <Row class={"items-center"}>
            <Header class={"text-center my-4 me-6"} size={4}>
              Create sleep rituals
            </Header>
            <Badge>NEW!</Badge>
          </Row>
          <Feature>Change the wallpaper when it's near bedtime</Feature>
          <Feature>Change the system colors when it's near bedtime</Feature>
          <Feature>
            <Badge class={"m-2 text-purple-100 bg-purple-600 dark:bg-purple-600"}>WIP</Badge> Play white noise
          </Feature>
        </Column>
        <img src={"https://i.imgur.com/bmIUVGN.png"} alt="Restrictions" class={"w-1/2 rounded-lg drop-shadow-2xl"}/>
      </Row>

      <Spacer class={"my-8"}/>

      <Row class={"justify-around"}>
        <img src={"https://i.imgur.com/jaaXftv.png"} alt="Cross-platform" class={"w-1/2 rounded-lg"}/>
        <Column>
          <Row class={"items-center"}>
            <Header class={"text-center my-4 me-6"} size={4}>
              Cross-platform
            </Header>
            <Badge>NEW!</Badge>
          </Row>
          <Feature>Tested on Windows 11</Feature>
          <Feature>
            <Badge class={"m-2 text-purple-100 bg-purple-600 dark:bg-purple-600"}>WIP</Badge>
            Tested on macOS 13
          </Feature>
          <Feature>
            <Badge class={"m-2 text-purple-100 bg-purple-600 dark:bg-purple-600"}>WIP</Badge>
            Tested on Fedora Workstation 39
          </Feature>
        </Column>
      </Row>

      <Divider class={"mx-8 mt-12"}/>

      <Header class={"text-center"}>Not convinced yet?</Header>
      <Pg class={"text-center text-xl text-yellow-800 dark:text-yellow-200 mx-8"}>
        Those who sign up for pre-release get <span class={"font-bold"}>15% off</span> the first year!
      </Pg>
      <Row class={"items-center justify-center center m-8 mx-8 mb-0"}>
        <SignUpButton/>
      </Row>
    </main>
  )
}