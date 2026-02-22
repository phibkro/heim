/** E2E test helpers — shared utilities for agent-browser tests */

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

const GREEN = "\x1b[0;32m";
const RED = "\x1b[0;31m";
const DIM = "\x1b[0;90m";
const RESET = "\x1b[0m";

let passCount = 0;
let failCount = 0;

function pass(name: string) {
  passCount++;
  console.log(`  ${GREEN}PASS${RESET} ${name}`);
}

function fail(name: string, detail?: string) {
  failCount++;
  console.log(`  ${RED}FAIL${RESET} ${name}`);
  if (detail) console.log(`       ${DIM}${detail}${RESET}`);
}

/** Run an agent-browser command and return stdout */
async function ab(args: string[]): Promise<string> {
  const proc = Bun.spawn(["agent-browser", ...args], {
    stdout: "pipe",
    stderr: "pipe",
  });
  const text = await new Response(proc.stdout).text();
  await proc.exited;
  return text.trim();
}

/** Take an accessibility snapshot */
async function snapshot(): Promise<string> {
  return ab(["snapshot"]);
}

/** Navigate to a path and wait for load */
async function navigate(path: string) {
  await ab(["open", `${BASE_URL}${path}`]);
  await Bun.sleep(1000);
}

/** Assert text contains needle (case-insensitive) */
function assertContains(haystack: string, needle: string, name: string) {
  if (haystack.toLowerCase().includes(needle.toLowerCase())) {
    pass(name);
  } else {
    fail(name, `expected to contain: ${needle}`);
  }
}

/** Assert text does NOT contain needle */
function assertNotContains(haystack: string, needle: string, name: string) {
  if (haystack.toLowerCase().includes(needle.toLowerCase())) {
    fail(name, `expected NOT to contain: ${needle}`);
  } else {
    pass(name);
  }
}

/** Assert current URL contains expected string */
async function assertUrl(expected: string, name?: string) {
  const label = name ?? `URL contains ${expected}`;
  const url = await ab(["get", "url"]);
  if (url.includes(expected)) {
    pass(label);
  } else {
    fail(label, `got: ${url}`);
  }
}

/** Assert snapshot matches a regex */
function assertMatches(haystack: string, pattern: RegExp, name: string) {
  if (pattern.test(haystack)) {
    pass(name);
  } else {
    fail(name, `no match for: ${pattern}`);
  }
}

/** Print test file header */
function header(name: string) {
  console.log(`\n${DIM}--- ${name} ---${RESET}`);
}

/** Return counts for the runner to aggregate */
function getCounts(): { pass: number; fail: number } {
  return { pass: passCount, fail: failCount };
}

export {
  ab,
  assertContains,
  assertMatches,
  assertNotContains,
  assertUrl,
  getCounts,
  header,
  navigate,
  snapshot,
};
