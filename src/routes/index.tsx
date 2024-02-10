import Row from "~/components/layout/Row";
import Header from "~/components/typography/Header";
import Pg from "~/components/typography/Pg";
import Column from "~/components/layout/Column";
import Divider from "~/components/decoration/Divider";
import {OutlinedButton} from "~/components/input/Button";
import {useNavigate} from "@solidjs/router";
import {SignUpButton} from "~/components/input/SignUpButton";
import Flex from "~/components/layout/Flex";
import {JSXElement} from "solid-js";
import {DisplayScreenshotWithFeatures} from "~/components/layout/DisplayScreenshotWithFeatures";

function TiredGuy() {
  return <DisplayScreenshotWithFeatures
    image={<img src="/tiredness.png" alt="A tired man" class={"w-40 h-40 md:w-48 md:h-48 lg:w-80 lg:h-80"}/>}
    alternateIndex={1}
  >
    <Column>
      <Header size={3} class={"lg:text-5xl my-4"}>
        Say good bye to eye bags
      </Header>
      <Pg class={"mx-12 text-2xl"}>
        <span class={"italic"}>I'm going to stick this time</span>, or so we say.
      </Pg>
    </Column>
  </DisplayScreenshotWithFeatures>
}

function Sleepy() {
  return <DisplayScreenshotWithFeatures
    image={<img src="/sleeping.png"
                alt="A boy sleeping"
                class={"w-40 h-40 md:w-48 md:h-48 lg:w-80 lg:h-80"}/>}
    alternateIndex={2}
  >
    <Column>
      <Header size={3} class={"lg:text-5xl mb-4"}>
        Move beyond good intentions
      </Header>
      <Pg class={"mx-12 text-2xl"}>
        Leave no wiggle room. Add rituals and routines
      </Pg>
    </Column>
  </DisplayScreenshotWithFeatures>
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
  return <Column class={"m-6 mt-4 lg:m-12 center"}>
    <Header size={3} class={"text-center text-3xl lg:text-6xl m-4 lg:m-8"}>
      {props.label}
    </Header>
    {props.description && <Pg class={"text-xl lg:text-3xl text-center"}>{props.description}</Pg>}
    <img src={props.src}
         alt={props.alt}
         class={`lg:size-3/4 aspect-auto rounded-2xl ${props.class || ""} mt-4 mb-6`}
    />
    <Divider class={"mx-12 w-full"}/>
  </Column>
}

function WIDPart(props: {
  index: number,
  src: string,
  alt: string,
  children: JSXElement
}) {
  return <Row class={"my-4"}>
    <Pg class={"rounded-full p-8 text-3xl"}>{props.index}</Pg>
    <img src={props.src} alt={props.alt} class={"w-16 h-16"}/>
    <Pg class={"px-8 text-2xl text-wrap"}>
      {props.children}
    </Pg>
  </Row>
}

function WhatItDoes() {
  let index = 1
  return <>
    <Header class={"text-center text-5xl lg:text-7xl"}>What it does</Header>
    <Column class={"justify-around "}>
      <WIDPart index={index++} src={"/clock.png"} alt={"Time"}>
        Set the time you want to sleep in
      </WIDPart>
      <WIDPart index={index++} src={"/barrier.png"} alt={"Blocking apps"}>
        Before this time comes, your computer will enter a restriction
        period, where certain apps and websites will be inaccessible, to allow you
        to ease into sleep
      </WIDPart>
      <WIDPart index={index++} src={"/shutdown.png"} alt={"Time"}>
        When it's bedtime, your computer will forcibly shut-down
      </WIDPart>
    </Column>
  </>;
}

const HEALTH_ARTICLE = "https://www.webmd.com/sleep-disorders/benefits-sleep-more"
const FITNESS_ARTICLE = "https://www.sleepfoundation.org/physical-activity/athletic-performance-and-sleep"

function Article(props: {
  url: string,
  text: string,
  superscript: number
}) {
  return <a class={"text-yellow-900 dark:text-yellow-200 underline"} href={props.url} target="_blank">
    {props.text}<span class={"align-super text-[16px]"}>{props.superscript}</span>
  </a>
}

function HealthArticle() {
  return <Article text={"health"} url={HEALTH_ARTICLE} superscript={1}/>
}

function FitnessArticle() {
  return <Article text={"fitness"} url={FITNESS_ARTICLE} superscript={2}/>
}

export default function Home() {
  const navigate = useNavigate()
  return (
    <main>
      <title>Sleep, or else - A better way to enforce sleep schedules</title>
      <Header class={"text-center text-5xl md:text-6xl lg:text-8xl mt-0"}>Sleep, or else...</Header>
      <Pg class={"px-4 mx-auto text-center text-2xl lg:text-3xl"}>
        Stick to your sleep schedule. Reap the <HealthArticle/> and <FitnessArticle/> benefits of getting
        more sleep.
      </Pg>
      <Pg class={"px-4 mx-auto text-center text-xl mt-12 text-yellow-800 dark:text-yellow-200"}>
        Sign up for pre-release for a <span class={"font-bold"}>15% off</span> the first year!
      </Pg>
      <Flex class={"flex-col lg:flex-row px-3 items-center justify-center center m-8 scale-[85%] lg:scale-100"}>
        <SignUpButton/>
        <OutlinedButton onClick={() => navigate("/features", {replace: true})}>Explore features</OutlinedButton>
      </Flex>
      <Divider class={"m-12"}/>
      <TiredGuy/>
      <Sleepy/>
      <Divider class={"mx-10 mt-12"}/>
      <WhatItDoes/>
      <Divider class={"mx-10 mt-12"}/>
      <Screenshot
        label={"Set up a bedtime. And this time, stick to it."}
        src={"https://i.imgur.com/sJzh4oU.png"}
        description={"Set the time your computer will shut-down"}
      />
      <Screenshot
        label={"Ease into sleep"}
        src={"https://i.imgur.com/gqLM54Z.png"}
        description={"Specify the duration of the restriction period before your bedtime"}
      />
      <Screenshot
        label={"Establish the rules beforehand"}
        src={"https://i.imgur.com/zb9yG49.png"}
        description={"Restrict the applications and websites you can access near bedtime"}
      />
      <Screenshot
        label={"Create sleep rituals"}
        src={"https://i.imgur.com/bmIUVGN.png"}
        description={"Change your wallpaper and system colors near sleep time, as a signal to wrap up your day"}
      />
      <Screenshot
        label={"It's inescapable!"}
        src={"https://i.imgur.com/RYzSur7.gif"}
        description={"A bit of firmness is necessary sometimes!"}
      />
      <Header size={3} class={"text-center lg:text-5xl"}>
        Sign up for pre-release now, and be an early adopter!
      </Header>
      <Pg class={"text-center text-xl text-yellow-800 dark:text-yellow-200 mx-8"}>
        Those who sign up for pre-release get <span class={"font-bold"}>15% off</span> the first year!
      </Pg>
      <Row class={"items-center justify-center center m-8 mx-8 scale-[85%] lg:scale-100"}>
        <SignUpButton/>
      </Row>
    </main>
  );
}
