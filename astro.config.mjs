import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Public-facing canonical URL — drives @astrojs/sitemap output
  // and the og:url tags in Base.astro. Tailnet shadow at
  // heim.nori.lan still works for direct/dev access.
  site: "https://me.phibkro.org",
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
