import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Public-facing canonical URL for the sitemap and og:url tags.
  site: "https://me.phibkro.org",
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
