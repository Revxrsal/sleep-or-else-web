import Row from "~/components/layout/Row";
import Header from "~/components/typography/Header";
import Pg from "~/components/typography/Pg";
import Column from "~/components/layout/Column";
import Divider from "~/components/decoration/Divider";
import {OutlinedButton} from "~/components/input/Button";
import Spacer from "~/components/decoration/Spacer";
import {useNavigate} from "@solidjs/router";
import {SignUpButton} from "~/components/input/SignUpButton";

function TiredGuy() {
  return <Row class={"justify-around m-12"}>
    <Column>
      <Header size={5}>
        Say good bye to eye bags
      </Header>
      <Pg class={"ms-12 text-2xl"}>
        <span class={"italic"}>I'm going to stick this time</span>, or so we say.
      </Pg>
    </Column>
    <img
      src="/tiredness.png"
      alt="A tired man"
      class={"w-40 h-40 md:w-48 md:h-48 lg:w-80 lg:h-80"}
    />
  </Row>
}

function Sleepy() {
  return <Row class={"justify-around m-12"}>
    <img src="/sleeping.png"
         alt="A boy sleeping"
         class={"w-40 h-40 md:w-48 md:h-48 lg:w-80 lg:h-80"}
    />
    <Column>
      <Header size={5}>
        Move beyond good intentions
      </Header>
      <Pg class={"ms-12 text-2xl"}>
        Leave no wiggle room. Add rituals and routines
      </Pg>
    </Column>
  </Row>
}

function Screenshot(
  props: {
    label: string,
    src: string,
    description?: string,
    class?: string,
    alt?: string
  }
) {
  return <Column class={"m-12 center"}>
    <Header size={6} class={"text-center"}>
      {props.label}
    </Header>
    {props.description && <Pg class={"text-3xl text-center"}>{props.description}</Pg>}
    <img src={props.src}
         alt={props.alt}
         class={`size-3/4 aspect-auto rounded-2xl ${props.class || ""}`}
    />
    <Divider class={"mx-12"}/>
  </Column>
}

function WhatItDoes() {
  return <>
    <Header class={"text-center"} size={7}>What it does</Header>
    <Column>
      <Row class={"center justify-around"}>
        <img
          src={"/clock.png"}
          alt={"Time"}
          class={"w-24 h-24"}
        />
        <img
          src={"/barrier.png"}
          alt={"Time"}
          class={"w-24 h-24"}
        />
        <img
          src={"/shutdown.png"}
          alt={"Time"}
          class={"w-24 h-24"}
        />
      </Row>
      <Spacer class={"my-8"}/>
      <Row class={"center align-top justify-around"}>
        <Pg class={"text-2xl text-wrap w-1/4"}>
          Set the time you want to sleep in
        </Pg>
        <Pg class={"text-2xl text-wrap w-1/4"}>
          Before this time comes, your computer will enter a restriction
          period, where certain apps and websites will be inaccessible, to allow you
          to ease into sleep
        </Pg>
        <Pg class={"text-2xl text-wrap w-1/4"}>
          When it's bedtime, your computer will forcibly shut-down
        </Pg>
      </Row>
    </Column>
  </>;
}

export default function Home() {
  const navigate = useNavigate()
  return (
    <main>
      <title>Sleep, or else - A better way to enforce sleep schedules</title>
      <Header class={"text-center"} size={9}>Sleep, or else...</Header>
      <Pg class={"text-center text-3xl"}>
        The ultimate application for making sure you stick to your sleep schedule
      </Pg>
      <Pg class={"text-center text-xl mt-12 text-yellow-800 dark:text-yellow-200"}>
        Sign up for pre-release for a <span class={"font-bold"}>15% off</span> the first year!
      </Pg>
      <Row class={"items-center justify-center center m-8"}>
        <SignUpButton/>
        <OutlinedButton onClick={() => navigate("/features", {replace: true})}>Explore features</OutlinedButton>
      </Row>
      <Divider class={"m-12"}/>
      <TiredGuy/>
      <Sleepy/>
      <Divider class={"mx-10 mt-12"}/>
      <WhatItDoes/>
      <Divider class={"mx-10 mt-12"}/>
      <Screenshot
        label={"Set up a bedtime. And this time, stick to it."}
        src={"/screenshots/set-time-screen.png"}
        description={"Set the time your computer will shut-down"}
      />
      <Screenshot
        label={"Ease into sleep"}
        src={"/screenshots/set-warning-screen.png"}
        description={"Specify the duration of the restriction period before your bedtime"}
      />
      <Screenshot
        label={"Establish thek rules beforehand"}
        src={"https://i.imgur.com/zb9yG49.png"}
        description={"Restrict the applications and websites you can access near bedtime"}
      />
      <Screenshot
        label={"Create sleep rituals"}
        src={"https://i.imgur.com/bmIUVGN.png"}
        description={"Change your wallpaper and system colors near sleep time, as a signal to wrap up your day"}
        class={"size-[60%] my-12 center"}
      />
      <Screenshot
        label={"It's inescapable!"}
        src={"https://i.imgur.com/RYzSur7.gif"}
        description={"A bit of firmness is necessary sometimes!"}
        class={"size-[60%] my-12 center "}
      />
      <Divider class={"mx-8"}/>
      <Header size={5} class={"text-center"}>
        Sign up for pre-release now, and be an early adopter!
      </Header>
      <Pg class={"text-center text-xl text-yellow-800 dark:text-yellow-200 mx-8"}>
        Those who sign up for pre-release get <span class={"font-bold"}>15% off</span> the first year!
      </Pg>
      <Row class={"items-center justify-center center m-8 mx-8"}>
        <SignUpButton/>
      </Row>
    </main>
  );
}
