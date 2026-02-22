/** E2E: Navigation & layout */
import {
  assertContains,
  assertUrl,
  getCounts,
  header,
  navigate,
  snapshot,
} from "../helpers";

header("Navigation & Layout");

// Homepage should already be open from runner
let snap = await snapshot();

assertContains(snap, "Philip Krogh", "Header shows Philip Krogh");
assertContains(snap, "Projects", "Nav has Projects link");
assertContains(snap, "Writing", "Nav has Writing link");
assertContains(snap, "Now", "Nav has Now link");
assertContains(snap, "About", "Nav has About link");

// Navigate to each page and verify URL + heading
await navigate("/projects");
await assertUrl("/projects", "Navigated to /projects");
snap = await snapshot();
assertContains(snap, "Projects", "Projects page has heading");

await navigate("/writing");
await assertUrl("/writing", "Navigated to /writing");
snap = await snapshot();
assertContains(snap, "Writing", "Writing page has heading");

await navigate("/now");
await assertUrl("/now", "Navigated to /now");
snap = await snapshot();
assertContains(snap, "Now", "Now page has heading");

await navigate("/about");
await assertUrl("/about", "Navigated to /about");
snap = await snapshot();
assertContains(snap, "About", "About page has heading");

// Return home
await navigate("/");
await assertUrl("localhost:3000", "Back to homepage");

const c = getCounts();
console.log(`COUNTS:${c.pass}:${c.fail}`);
