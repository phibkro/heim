/** E2E: Projects page */
import {
  assertContains,
  assertMatches,
  getCounts,
  header,
  navigate,
  snapshot,
} from "../helpers";

header("Projects");

await navigate("/projects");
const snap = await snapshot();

// Section header
assertContains(snap, "Projects", "Section header shows Projects");
assertContains(snap, "items", "Meta shows item count");

// Section index
assertContains(snap, "01", "Section index 01 present");

// Year in side column (4-digit year)
assertMatches(snap, /20\d{2}/, "Year visible in side column");

const c = getCounts();
console.log(`COUNTS:${c.pass}:${c.fail}`);
