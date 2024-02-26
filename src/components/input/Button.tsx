import {ComponentProps, onMount, splitProps} from "solid-js";


export interface ButtonProps extends ComponentProps<"button"> {
  class?: string,
  onClick?: (event: MouseEvent) => void
}

export function OutlinedButton(props: ButtonProps) {
  const [local, bProps] = splitProps(props, ["class", "onClick"]);
  return <button
    class={`
        bg-stone-300 dark:bg-stone-800
        mt-0 p-4 m-4 px-6
        w-fit overflow-hidden
        rounded-full
        text-stone-950 dark:text-stone-200
        hover:brightness-90 font-medium
        ${local.class || ""}`}
    onClick={event => {
      rippleEffect(event)
      local.onClick?.(event)
    }}
    {...bProps}/>;
}

export default function Button(props: ButtonProps) {
  const [local, bProps] = splitProps(props, ["class", "onClick"]);
  const bg = () => local.class?.includes("bg-") ? "" : "bg-yellow-800 dark:bg-yellow-300"
  const text = () => local.class?.includes("text-") ? "" : "text-stone-100 dark:text-stone-800"
  return <button
    onClick={event => {
      rippleEffect(event)
      local.onClick?.(event)
    }}
    class={`
        mt-0 p-4 m-4 px-6 overflow-hidden
        w-fit
        disabled:opacity-85
        rounded-full
        ${bg()} ${text()}  
        disabled:bg-stone-500 dark:disabled:bg-stone-500 
        enabled:hover:brightness-90 font-medium
        ${local.class || ""}`} {...bProps}/>;
}

function rippleEffect(event: MouseEvent & { currentTarget: HTMLButtonElement }) {
  const btn = event.currentTarget;

  const circle = document.createElement("span");
  const diameter = Math.max(btn.clientWidth, btn.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - (btn.offsetLeft + radius)}px`;
  circle.style.top = `${event.clientY - (btn.offsetTop + radius)}px`;
  circle.classList.add("ripple");

  const ripple = btn.getElementsByClassName("ripple")[0];

  // if (ripple) {
  //   ripple.remove();
  // }

  setTimeout(() => circle.remove(), 1000)

  btn.appendChild(circle);
}