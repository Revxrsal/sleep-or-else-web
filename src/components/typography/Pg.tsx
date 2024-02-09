import { ComponentProps, splitProps } from "solid-js";

/**
 * Represents a text component. We specify our own 'class'
 * property to be able to add our own classes then allow
 * the user to add additional classes as needed.
 */
export interface ParagraphProps extends ComponentProps<"p"> {
    class?: string,
    i?: boolean
}

export default function Pg(props: ParagraphProps) {
    const [local, pProps] = splitProps(props, ["class", "i"])
    const inverse = local.i == undefined ? false : local.i
    const textColor = inverse ? "text-on-container" : "text-on-bg"
    return <p class={`${textColor} text ${local.class || ""}`} {...pProps} />
}