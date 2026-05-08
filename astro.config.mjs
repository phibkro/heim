import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sentry from "@sentry/astro";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// SENTRY_DSN drives both build-time bundle injection and runtime
// init. Unset (or empty) → @sentry/astro no-ops with a single
// console warning, no network calls, no overhead beyond the SDK
// load. Setting the env variable is the *single switch* that
// activates error reporting once a Sentry project + DSN exists.
const sentryDsn = process.env.SENTRY_DSN ?? "";

export default defineConfig({
  // Public-facing canonical URL — drives @astrojs/sitemap output
  // and the og:url tags in Base.astro. Tailnet shadow at
  // heim.nori.lan still works for direct/dev access.
  site: "https://me.phibkro.org",
  integrations: [
    react(),
    sitemap(),
    // Always include the integration so the SDK is wired into the
    // bundle; it gracefully no-ops when DSN is empty.
    sentry({
      dsn: sentryDsn,
      sourceMapsUploadOptions: { telemetry: false },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
