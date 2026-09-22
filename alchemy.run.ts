import * as Alchemy from "alchemy";
import * as Cloudflare from "alchemy/Cloudflare";
import * as Effect from "effect/Effect";
const state =
  process.env.ALCHEMY_STAGE === "development"
    ? Alchemy.localState()
    : Cloudflare.state();


export default Alchemy.Stack(
  "heim",
  {
    providers: Cloudflare.providers(),
    state,
  },
  Effect.gen(function* () {
    const site = yield* Cloudflare.Website.StaticSite("Site", {
      name: "heim",
      command: "bun run build",
      outdir: "dist",
      domain: "me.phibkro.org",
      workersDev: false,
      assets: {
        notFoundHandling: "404-page",
      },
      dev: {
        command: "bun run web:dev",
        env: {
          NODE_ENV: "development",
        },
        url: "http://localhost:4321",
      },
    });

    return { site };
  }),
);

export const meta = {
  Site: {
    commands: {
      build: "bun run build",
      dev: "bun run dev",
      plan: "bun run plan",
      typecheck: "bun run typecheck",
    },
    runtime: "Cloudflare Worker static assets",
    trust: {
      input: "public-static-content",
    },
  },
} as const;
