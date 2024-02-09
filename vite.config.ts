import {defineConfig} from "@solidjs/start/config";

export default defineConfig({
  start: {
    server: {preset: "vercel"}
  },

  server: {
    fs: {
      allow: ["../.."]
    }
  },
});
