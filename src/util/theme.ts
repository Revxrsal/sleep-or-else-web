import {createContext, createEffect, createSignal, Signal, useContext} from "solid-js";

const initializeTheme = () => {
  if (typeof localStorage !== "undefined" && localStorage.getItem("sleep-or-else.dark-theme")) {
    return localStorage.getItem("sleep-or-else.dark-theme") === "true";
  } else {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
};

export const DarkModeContext = createContext<Signal<boolean>>()

export function useDarkMode() {
  return useContext(DarkModeContext)!
}

export function createDarkModeSignal(): Signal<boolean> {
  const [isDark, setDark] = createSignal(true)
  createEffect(() => setDark(initializeTheme()))
  createEffect(() => {
    if (isDark()) {
      localStorage.setItem("sleep-or-else.dark-theme", "true")
    } else {
      localStorage.setItem("sleep-or-else.dark-theme", "false")
    }
  })
  return [isDark, setDark]
}