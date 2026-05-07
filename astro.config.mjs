import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://heim.nori.lan",
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
