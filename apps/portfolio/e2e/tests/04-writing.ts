/** E2E: Writing page */
import {
  assertContains,
  assertMatches,
  getCounts,
  header,
  navigate,
  snapshot,
} from "../helpers";

header("Writing");

await navigate("/writing");
const snap = await snapshot();

// Section header
assertContains(snap, "Writing", "Section header shows Writing");
assertContains(snap, "posts", "Meta shows post count");

// Post links to /writing/<slug>
assertMatches(snap, /\/writing\/[\w-]+/, "Post links to /writing/<slug>");

// Date visible (month name)
assertMatches(
  snap,
  /Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/,
  "Date visible on posts",
);

// Read time
assertContains(snap, "min", "Read time visible");

const c = getCounts();
console.log(`COUNTS:${c.pass}:${c.fail}`);
