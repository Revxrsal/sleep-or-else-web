import {ComponentProps, JSX, splitProps} from "solid-js";

export interface IconButtonProps extends ComponentProps<"button"> {
    class?: string;
}

export default function IconButton(props: IconButtonProps) {
    const [iProps, bProps] = splitProps(props, ["class"]);
    return <button
        class={`fill text p-2
                hover:text-stone-100 hover:scale-105 transition-all 
                focus:ring-2 focus:ring-yellow-700 
                rounded-md ${iProps.class || ""}`
        }
        {...bProps}
    />
}