import {ComponentProps, splitProps} from "solid-js";

export interface ColumnProps extends ComponentProps<"div"> {
    class?: string;
    center?: boolean
}

export default function Column(props: ColumnProps) {
    const [local, div] = splitProps(props, ["class", "center"]);
    return <div class={`flex flex-col ${props.center ? "center" : ""} ${local.class || ""}`} {...div} />;
}
