// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://omamobile.org",
  output: "static",
  trailingSlash: "ignore",
  vite: {
    build: {
      // Never inline scripts into the page: the server's Content-Security-Policy
      // (script-src 'self') blocks inline scripts, so they must ship as files.
      assetsInlineLimit: 0,
    },
  },
});
