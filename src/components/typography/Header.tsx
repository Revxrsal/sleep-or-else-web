import {ComponentProps, splitProps} from "solid-js";

export interface HeaderProps extends ComponentProps<"h1"> {
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  i?: boolean
  class?: string;
}

function getClass(size?: number): string {
  size = size == undefined ? 6 : size
  if (size === 1) return "text-xl";
  else return `text-${size}xl`;
}

export default function Header(props: HeaderProps) {
  const [local, h1Props] = splitProps(props, ["class", "i"]);
  const inverse = local.i == undefined ? false : local.i
  const textColor = inverse ? "text-on-container" : "text-on-bg"
  return (
    <h1
      class={`${textColor} text m-12 font-bold ${getClass(props.size)} ${local.class || ""}`}
      {...h1Props}
    />
  );
}
