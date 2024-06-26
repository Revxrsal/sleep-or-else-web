import Row from "~/components/layout/Row";
import Header from "~/components/typography/Header";
import Pg from "~/components/typography/Pg";
import Column from "~/components/layout/Column";
import Divider from "~/components/decoration/Divider";
import Button, {OutlinedButton} from "~/components/input/Button";
import {useNavigate} from "@solidjs/router";
import {SignUpButton} from "~/components/input/SignUpButton";
import Flex from "~/components/layout/Flex";
import {JSXElement, Show} from "solid-js";
import {DisplayScreenshotWithFeatures} from "~/components/layout/DisplayScreenshotWithFeatures";
import Spacer from "~/components/decoration/Spacer";
import {createSupabaseSessionResource} from "~/database/primitives";
import Badge from "~/components/decoration/Badge";

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
        alt?: string,
        wip?: boolean
    }
) {
    return <Column class={"m-6 lg:m-12 mt-0 lg:mt-0 center"}>
        <Show when={props.wip === true}>
            <Badge class={"scale-150 m-2 text-purple-100 bg-purple-600 dark:bg-purple-600"}>WIP</Badge>
        </Show>
        <Header size={3} class={"text-center text-3xl lg:text-6xl m-4 lg:m-8"}>
            {props.label}
        </Header>

        {props.description && <Pg class={"text-xl lg:text-3xl text-center"}>{props.description}</Pg>}
        <img src={props.src}
             alt={props.alt}
             class={`lg:size-3/4 aspect-auto rounded-2xl ${props.class || ""} my-6`}
        />
        <Divider class={"mt-4 mx-12 w-full"}/>
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
                Set the time you want to sleep in, or set a sleep improvement plan
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
    const session = createSupabaseSessionResource()
    return (
        <main>
            <title>Sleep, or else - A better way to enforce sleep schedules</title>
            <Header class={"text-center text-5xl md:text-6xl lg:text-8xl mt-0"}>Sleep, or else...</Header>
            <Pg class={"px-4 mx-auto text-center text-2xl lg:text-3xl"}>
                Stick to your sleep schedule. Reap the <HealthArticle/> and <FitnessArticle/> benefits of getting
                more sleep.
            </Pg>
            <Flex class={"flex-col lg:flex-row px-3 items-center justify-center center m-8 scale-[85%] lg:scale-100"}>
                <Show when={session() == null} fallback={
                    <Button onClick={() => navigate("/pricing")}>Buy now</Button>
                }>
                    <SignUpButton/>
                </Show>
                <OutlinedButton onClick={() => navigate("/features", {replace: true})}>Explore features</OutlinedButton>
            </Flex>
            <Divider class={"m-12"}/>
            <TiredGuy/>
            <Sleepy/>
            <Divider class={"mx-10 mt-12"}/>
            <WhatItDoes/>
            <Divider class={"mx-10 mt-12"}/>
            <Spacer class={"mt-12"}/>
            <Screenshot
                label={"Customize it to fit your needs"}
                src={"https://i.imgur.com/EkzBmhH.png"}
                description={"You can pick a strict bedtime, or a sleep improvement plan"}
            />
            <Screenshot
                label={"Set up a bedtime. And this time, stick to it."}
                src={"https://i.imgur.com/MTw5yvS.png"}
                description={"Set the time your computer will shut-down"}
            />
            <Screenshot
                label={"Or, fix your sleep"}
                src={"https://i.imgur.com/V9RlpLV.png"}
                description={"Shift your bedtime by a little everyday to seamlessly fix your sleep schedule"}
            />
            <Screenshot
                label={"Ease into sleep"}
                src={"https://i.imgur.com/wIwXsox.png"}
                description={"Specify the duration of the restriction period before your bedtime"}
            />
            <Screenshot
                label={"Establish the rules beforehand"}
                src={"https://i.imgur.com/Q4HLPXA.png"}
                description={"Restrict the applications and websites you can access near bedtime"}
            />
            <Screenshot
                label={"It's inescapable!"}
                src={"https://i.imgur.com/o2GWh1F.gif"}
                description={"A bit of firmness is necessary sometimes!"}
            />
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
    );
}
