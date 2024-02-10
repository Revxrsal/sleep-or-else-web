import {createMemo, JSXElement} from "solid-js";
import {createMediaQuery} from "@solid-primitives/media";
import Flex from "~/components/layout/Flex";

export function DisplayScreenshotWithFeatures(props: {
  alternateIndex: number
  image: JSXElement,
  children: JSXElement
}) {
  const canAlternate = createMediaQuery("(min-width: 1024px)")
  const image = () => {
    return <div class={"mt-6 lg:mt-0 lg:w-1/2 "}>
      {props.image}
    </div>
  }
  const showImageFirst = createMemo(() => canAlternate() && props.alternateIndex % 2 == 1)
  return <Flex class={"flex-col lg:flex-row mx-auto justify-around items-center"}>
    {showImageFirst() && image()}
    {props.children}
    {!showImageFirst() && image()}
  </Flex>
}