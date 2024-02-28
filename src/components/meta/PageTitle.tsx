import {JSX} from "solid-js";
import {Title} from "@solidjs/meta";

export default function PageTitle(props: { children: JSX.Element }) {
  return <Title>{`${props.children} - Sleep or else`}</Title>
}
