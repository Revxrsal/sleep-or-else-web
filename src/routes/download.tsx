import PageTitle from "~/components/meta/PageTitle";
import Column from "~/components/layout/Column";
import Header from "~/components/typography/Header";
import {FaBrandsApple, FaBrandsMicrosoft} from "solid-icons/fa";
import Pg from "~/components/typography/Pg";
import {VsTerminalLinux} from "solid-icons/vs";
import Flex from "~/components/layout/Flex";
import {Component} from "solid-js";

function Platform(props: {
  icon: Component,
  label: string,
  class?: string
}) {
  return (
    <Column center class={`hover:scale-105 cursor-pointer transition-all m-8 ${props.class || ""}`}>
      {props.icon({
        size: 72,
        class: "m-8 fill-stone-800 dark:fill-yellow-200"
      })}
      <Pg class={"text-xl lg:text-2xl font-semibold"}>{props.label}</Pg>
    </Column>
  )
}

export default function Download() {
  return (
    <main class={"pb-0"}>
      <Column class={"center"}>
        <PageTitle>Download</PageTitle>
        <Header class={"text-center"}>
          Download
        </Header>
        <Flex class={"flex-col lg:flex-row justify-around lg:w-full"}>

          <Platform
            icon={FaBrandsMicrosoft}
            label="Download for Windows"
          />

          <Platform
            icon={FaBrandsApple}
            label="Download for macOS"
          />

          <Platform
            icon={VsTerminalLinux}
            label="Download for Linux"
          />
        </Flex>
      </Column>
    </main>
  )
}