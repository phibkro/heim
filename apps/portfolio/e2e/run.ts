#!/usr/bin/env bun
/** E2E test runner — starts dev server, runs tests, reports results */

import { readdirSync } from "node:fs";
import { join } from "node:path";

const GREEN = "\x1b[0;32m";
const RED = "\x1b[0;31m";
const BOLD = "\x1b[1m";
const DIM = "\x1b[0;90m";
const RESET = "\x1b[0m";

const appDir = join(import.meta.dir, "..");
const testsDir = join(import.meta.dir, "tests");

let devProc: ReturnType<typeof Bun.spawn> | null = null;

function cleanup() {
  if (devProc) {
    console.log(`\n${DIM}Stopping dev server...${RESET}`);
    devProc.kill();
    devProc = null;
  }
  // Close agent-browser
  Bun.spawnSync(["agent-browser", "close"], { stdout: "ignore", stderr: "ignore" });
}

process.on("SIGINT", () => { cleanup(); process.exit(1); });
process.on("SIGTERM", () => { cleanup(); process.exit(1); });

// Start dev server
console.log(`${BOLD}Starting dev server...${RESET}`);
devProc = Bun.spawn(["bun", "run", "dev", "--port", "3000"], {
  cwd: appDir,
  stdout: "ignore",
  stderr: "ignore",
});

// Wait for server
console.log(`${DIM}Waiting for server on :3000...${RESET}`);
const timeout = 60_000;
const start = Date.now();
let ready = false;
while (Date.now() - start < timeout) {
  try {
    const res = await fetch("http://localhost:3000");
    if (res.ok) { ready = true; break; }
  } catch { /* not ready yet */ }
  await Bun.sleep(1000);
}

if (!ready) {
  console.log(`${RED}Dev server did not start within ${timeout / 1000}s${RESET}`);
  cleanup();
  process.exit(1);
}
console.log(`${GREEN}Server ready${RESET} (${Math.round((Date.now() - start) / 1000)}s)\n`);

// Open browser once
Bun.spawnSync(["agent-browser", "open", "http://localhost:3000"], {
  stdout: "ignore",
  stderr: "ignore",
});
await Bun.sleep(2000);

// Discover and run test files
const testFiles = readdirSync(testsDir)
  .filter((f) => f.endsWith(".ts"))
  .sort()
  .map((f) => join(testsDir, f));

let totalPass = 0;
let totalFail = 0;

for (const testFile of testFiles) {
  const proc = Bun.spawn(["bun", "run", testFile], {
    stdout: "pipe",
    stderr: "pipe",
    env: { ...process.env, BASE_URL: "http://localhost:3000" },
  });

  const stdout = await new Response(proc.stdout).text();
  const exitCode = await proc.exited;

  // Print test output (everything except the COUNTS line)
  const lines = stdout.split("\n");
  const countsLine = lines.find((l) => l.startsWith("COUNTS:"));
  const output = lines.filter((l) => !l.startsWith("COUNTS:")).join("\n");
  if (output.trim()) console.log(output);

  if (countsLine) {
    const [, p, f] = countsLine.split(":");
    totalPass += Number(p);
    totalFail += Number(f);
  }

  if (exitCode !== 0 && !countsLine) {
    console.log(`  ${RED}Test file crashed: ${testFile}${RESET}`);
    const stderr = await new Response(proc.stderr).text();
    if (stderr.trim()) console.log(`  ${DIM}${stderr.trim()}${RESET}`);
    totalFail++;
  }
}

// Summary
console.log(`\n${BOLD}========== Results ==========${RESET}`);
console.log(`  ${GREEN}${totalPass} passed${RESET}`);
if (totalFail > 0) {
  console.log(`  ${RED}${totalFail} failed${RESET}`);
  console.log(`${BOLD}=============================${RESET}`);
  cleanup();
  process.exit(1);
} else {
  console.log(`${BOLD}=============================${RESET}`);
  console.log(`${GREEN}All tests passed.${RESET}`);
  cleanup();
  process.exit(0);
}
