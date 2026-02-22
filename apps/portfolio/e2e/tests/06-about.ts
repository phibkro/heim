/** E2E: About page */
import {
  assertContains,
  getCounts,
  header,
  navigate,
  snapshot,
} from "../helpers";

header("About");

await navigate("/about");
const snap = await snapshot();

// Section header
assertContains(snap, "About", "Section header shows About");

// Spec blocks
assertContains(snap, "identity", "SpecBlock: identity");
assertContains(snap, "technical", "SpecBlock: technical");
assertContains(snap, "currently", "SpecBlock: currently");

// Key content
assertContains(snap, "Oslo", "About mentions Oslo");
assertContains(snap, "TypeScript", "About mentions TypeScript");

const c = getCounts();
console.log(`COUNTS:${c.pass}:${c.fail}`);
