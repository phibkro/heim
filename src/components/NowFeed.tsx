import { useEffect, useState } from "react";

interface SlimEntry {
  id: string;
  content: string;
  date: string; // ISO
  tags: { slug: string; name: string }[];
  linkedPostSlug?: string;
}

interface Props {
  entries: SlimEntry[];
  availableTags: { slug: string; name: string }[];
}

// URL-param-driven filter + sort. Reads the initial state from
// `window.location.search` on mount; subsequent changes update both
// state and history without a navigation. Astro's static output means
// we can't read the URL during SSG — initial render is unfiltered,
// then the effect picks up the params client-side.
export default function NowFeed({ entries, availableTags }: Props) {
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [sort, setSort] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tags = params.get("tags")?.split(",").filter(Boolean) ?? [];
    const s = params.get("sort") === "asc" ? "asc" : "desc";
    setActiveTags(tags);
    setSort(s);
  }, []);

  const writeParams = (nextTags: string[], nextSort: "asc" | "desc") => {
    const params = new URLSearchParams();
    if (nextTags.length > 0) params.set("tags", nextTags.join(","));
    if (nextSort === "asc") params.set("sort", "asc");
    const qs = params.toString();
    const url = qs ? `?${qs}` : window.location.pathname;
    window.history.replaceState(null, "", url);
  };

  const toggleTag = (slug: string) => {
    const next = activeTags.includes(slug)
      ? activeTags.filter((t) => t !== slug)
      : [...activeTags, slug];
    setActiveTags(next);
    writeParams(next, sort);
  };

  const toggleSort = () => {
    const next = sort === "desc" ? "asc" : "desc";
    setSort(next);
    writeParams(activeTags, next);
  };

  const filtered =
    activeTags.length === 0
      ? entries
      : entries.filter((e) => activeTags.some((s) => e.tags.some((t) => t.slug === s)));

  const sorted = [...filtered].sort((a, b) => {
    const da = new Date(a.date).getTime();
    const db = new Date(b.date).getTime();
    return sort === "asc" ? da - db : db - da;
  });

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 border-b border-dashed border-[var(--line-strong)] px-4 py-3">
        <span className="shrink-0 text-[0.5rem] tracking-[0.15em] uppercase text-[var(--dim)]">
          Filter:
        </span>
        <div className="flex flex-1 flex-wrap gap-2">
          {availableTags.map((tag) => {
            const active = activeTags.includes(tag.slug);
            return (
              <button
                key={tag.slug}
                type="button"
                onClick={() => toggleTag(tag.slug)}
                className={`inline-flex cursor-pointer items-center border border-dashed px-2.5 py-1 text-[0.45rem] tracking-[0.12em] uppercase transition-colors ${
                  active
                    ? "border-[var(--accent)] text-[var(--accent2)]"
                    : "border-[var(--line-strong)] text-[var(--muted)] hover:bg-[var(--accent)]/12 hover:border-[var(--accent)] hover:text-[var(--accent2)]"
                }`}
                style={
                  active
                    ? { backgroundColor: "oklch(58% 0.09 220 / 0.12)" }
                    : undefined
                }
              >
                {tag.name}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={toggleSort}
          className="ml-auto shrink-0 cursor-pointer whitespace-nowrap border border-dashed border-[var(--line-strong)] bg-transparent px-2.5 py-1 font-[family-name:var(--font-mono)] text-[0.5rem] tracking-[0.12em] uppercase text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent2)]"
        >
          {sort === "desc" ? "↓ newest first" : "↑ oldest first"}
        </button>
      </div>

      <div className="flex flex-col">
        {sorted.map((entry, i) => (
          <div
            key={entry.id}
            className="grid grid-cols-[40px_1fr] border-b border-dashed border-[var(--line)] transition-colors hover:bg-[var(--accent)]/3 md:grid-cols-[56px_110px_1fr_auto]"
          >
            <div className="flex items-center justify-center border-r border-dashed border-[var(--line-strong)] py-4 text-[0.48rem] text-[var(--dim)]">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="hidden items-center border-r border-dashed border-[var(--line)] px-4 py-4 text-[0.58rem] tracking-[0.06em] whitespace-nowrap text-[var(--dim)] md:flex">
              {new Date(entry.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            <div className="relative flex flex-col justify-center gap-2 px-4 py-4 md:px-6">
              <span className="text-[0.78rem] leading-[1.7] text-[var(--fg)]">{entry.content}</span>
              {entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {entry.tags.map((tag) => (
                    <span
                      key={tag.slug}
                      className="inline-flex items-center border border-dashed border-[var(--line-strong)] px-2.5 py-1 text-[0.45rem] tracking-[0.12em] uppercase text-[var(--muted)]"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {entry.linkedPostSlug ? (
              <a
                href={`/writing/${entry.linkedPostSlug}`}
                className="hidden items-center border-l border-dashed border-[var(--line)] px-5 text-[0.65rem] text-[var(--dim)] no-underline transition-colors hover:text-[var(--accent2)] md:flex"
              >
                ↗
              </a>
            ) : (
              <div className="hidden border-l border-dashed border-[var(--line)] px-5 md:block" />
            )}
          </div>
        ))}
        {sorted.length === 0 && (
          <div className="px-6 py-10 text-[0.7rem] italic text-[var(--dim)]">
            // no entries match the current filter
          </div>
        )}
      </div>
    </div>
  );
}
