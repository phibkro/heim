/** E2E: Mobile viewport */
import {
  ab,
  assertContains,
  getCounts,
  header,
  navigate,
  snapshot,
} from "../helpers";

header("Mobile (375x812)");

// Set mobile viewport
await ab(["set", "viewport", "375", "812"]);
await Bun.sleep(500);

await navigate("/");
let snap = await snapshot();

// Header visible
assertContains(snap, "Philip Krogh", "Header visible on mobile");

// Hamburger button
assertContains(snap, "Open menu", "Hamburger button visible (Open menu)");

// Click hamburger to open mobile menu
await ab(["click", '[aria-label="Open menu"]']).catch(() =>
  ab(["find", "role", "button", "click", "Open menu"]),
);
await Bun.sleep(500);
snap = await snapshot();

// Mobile menu shows nav links
assertContains(snap, "Projects", "Mobile menu shows Projects");
assertContains(snap, "Writing", "Mobile menu shows Writing");
assertContains(snap, "Now", "Mobile menu shows Now");
assertContains(snap, "About", "Mobile menu shows About");

// Close button
assertContains(snap, "Close menu", "Close button visible");

// Click close
await ab(["click", '[aria-label="Close menu"]']).catch(() =>
  ab(["find", "role", "button", "click", "Close menu"]),
);
await Bun.sleep(500);
snap = await snapshot();

assertContains(snap, "Open menu", "Menu closed — Open menu button restored");

// Reset viewport
await ab(["set", "viewport", "1280", "800"]);

const c = getCounts();
console.log(`COUNTS:${c.pass}:${c.fail}`);
