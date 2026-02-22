/** E2E: Now page (interactive) */
import {
  ab,
  assertContains,
  assertMatches,
  getCounts,
  header,
  navigate,
  snapshot,
} from "../helpers";

header("Now");

await navigate("/now");
let snap = await snapshot();

// Section header
assertContains(snap, "Now", "Section header shows Now");
assertContains(snap, "entries", "Meta shows entry count");

// Filter UI
assertContains(snap, "Filter", "Filter label present");

// Sort toggle
assertMatches(snap, /newest first|oldest first/, "Sort toggle present");

// Interactive: click sort toggle to change order
if (snap.includes("newest first")) {
  await ab(["click", "text=newest first"]).catch(() =>
    ab(["click", "text=↓ newest first"]),
  );
  await Bun.sleep(1000);
  snap = await snapshot();
  assertContains(snap, "oldest first", "Sort toggle changes order");
} else {
  await ab(["click", "text=oldest first"]).catch(() =>
    ab(["click", "text=↑ oldest first"]),
  );
  await Bun.sleep(1000);
  snap = await snapshot();
  assertContains(snap, "newest first", "Sort toggle changes order");
}

const c = getCounts();
console.log(`COUNTS:${c.pass}:${c.fail}`);
