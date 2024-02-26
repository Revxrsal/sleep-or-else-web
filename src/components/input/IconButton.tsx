import {ComponentProps, JSX, splitProps} from "solid-js";

export interface IconButtonProps extends ComponentProps<"button"> {
    class?: string;
}

export default function IconButton(props: IconButtonProps) {
    const [iProps, bProps] = splitProps(props, ["class"]);
    return <button
        class={`fill text p-2
                hover:text-stone-100 transition-all 
                rounded-md ${iProps.class || ""}`
        }
        {...bProps}
    />
}