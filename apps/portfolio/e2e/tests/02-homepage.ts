/** E2E: Homepage content */
import {
  assertContains,
  getCounts,
  header,
  navigate,
  snapshot,
} from "../helpers";

header("Homepage");

await navigate("/");
const snap = await snapshot();

// Hero content
assertContains(snap, "Building", "Hero heading — Building");
assertContains(snap, "Systems", "Hero heading — Systems");
assertContains(snap, "That Last", "Hero heading — That Last");

// Spec block
assertContains(snap, "Entity", "Spec block has Entity row");
assertContains(snap, "Role", "Spec block has Role row");
assertContains(snap, "Location", "Spec block has Location row");
assertContains(snap, "Stack", "Spec block has Stack row");

// Social links
assertContains(snap, "GitHub", "CTA: GitHub");
assertContains(snap, "LinkedIn", "CTA: LinkedIn");
assertContains(snap, "Email", "CTA: Email");
assertContains(snap, "CV", "CTA: CV");

// Copyright
assertContains(snap, "Philip", "Copyright text visible");

const c = getCounts();
console.log(`COUNTS:${c.pass}:${c.fail}`);
