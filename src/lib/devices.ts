// Device data, read from the main repository's docs/DEVICES.md at build time.
// The site never hand-copies a status: every cell here comes from that file.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export const REPO_URL = "https://github.com/derekross/omarchy-mobile";
const REPO_DIR = resolve(process.env.OMAMOBILE_REPO ?? "../omarchy-mobile");
const DOCS_DIR = "docs";

export type Status = "works" | "testing" | "partial" | "wip" | "built" | "boots" | "no" | "none";

export interface Cell {
  status: Status;
  label: string; // the status word as written ("works", "WIP", ...)
  detail: string; // inline markdown after the status word, without its parentheses
}

export interface Subsystem {
  name: string;
  cell: Cell;
  notes: string; // inline markdown
  plan: string; // inline markdown links to the plans
}

export interface Device {
  name: string; // inline markdown, e.g. "Pixel 9a ([notes](...))"
  title: string; // plain text, e.g. "Pixel 9a"
  codename: string;
  soc: string;
  cells: Record<string, Cell>;
  detail?: Subsystem[]; // the "<codename> in detail" table, when there is one
}

export interface Wanted {
  title: string;
  codename: string;
  soc: string;
  start: string; // inline markdown
}

const STATUS_WORDS: Record<string, Status> = {
  works: "works", testing: "testing", partial: "partial", wip: "wip",
  built: "built", boots: "boots", no: "no", "-": "none",
};

export const STATUS_TEXT: Record<Status, string> = {
  works: "Works",
  testing: "Testing",
  partial: "Partial",
  wip: "In progress",
  built: "Built",
  boots: "Firmware runs",
  no: "Not yet",
  none: "Not on this device",
};

function splitRow(line: string): string[] {
  // A table row; "|" inside backticks or links doesn't occur in DEVICES.md.
  return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
}

function tables(section: string): string[][][] {
  const out: string[][][] = [];
  let cur: string[][] | null = null;
  for (const line of section.split("\n")) {
    if (line.trim().startsWith("|")) {
      if (/^\|\s*-{3}/.test(line.trim())) continue;
      (cur ??= []).push(splitRow(line));
    } else if (cur) {
      out.push(cur);
      cur = null;
    }
  }
  if (cur) out.push(cur);
  return out;
}

function sections(md: string): Map<string, string> {
  const map = new Map<string, string>();
  const parts = md.split(/^## /m).slice(1);
  for (const p of parts) {
    const nl = p.indexOf("\n");
    map.set(p.slice(0, nl).trim(), p.slice(nl + 1));
  }
  return map;
}

export function plain(md: string): string {
  return md
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .trim();
}

export function parseCell(text: string): Cell {
  const m = text.match(/^\s*(works|testing|partial|WIP|built|boots|no|-)(?![A-Za-z])\s*(?:\((.*)\))?\s*(.*)$/is);
  if (!m) return { status: "no", label: text, detail: "" };
  const word = m[1];
  const detail = [m[2], m[3]].filter(Boolean).join(" ").trim();
  return { status: STATUS_WORDS[word.toLowerCase()] ?? "no", label: word, detail };
}

function load() {
  const md = readFileSync(resolve(REPO_DIR, DOCS_DIR, "DEVICES.md"), "utf8");
  const secs = sections(md);

  const [matrix] = tables(secs.get("Matrix") ?? "");
  const header = matrix[0];
  const subsystems = header.slice(3);
  const devices: Device[] = matrix
    .slice(1)
    .filter((r) => !r[0].startsWith("*")) // the template row
    .map((r) => {
      const cells: Record<string, Cell> = {};
      subsystems.forEach((s, i) => (cells[s] = parseCell(r[3 + i] ?? "")));
      return { name: r[0], title: plain(r[0].replace(/\(.*\)/, "")), codename: plain(r[1]), soc: plain(r[2]), cells };
    });

  for (const [title, body] of secs) {
    const m = title.match(/^(\S+) \(.*\) in detail$/);
    if (!m) continue;
    const dev = devices.find((d) => d.codename === m[1]);
    const [t] = tables(body);
    if (dev && t) dev.detail = t.slice(1).map((r) => ({ name: r[0], cell: parseCell(r[1]), notes: r[2] ?? "", plan: r[3] ?? "" }));
  }

  const [w] = tables(secs.get("Wanted") ?? "");
  const wanted: Wanted[] = (w ?? []).slice(1).map((r) => ({ title: plain(r[0]), codename: plain(r[1]), soc: plain(r[2]), start: r[3] }));

  return { devices, subsystems, wanted };
}

export const { devices, subsystems, wanted } = load();
export const reference = devices[0];

// Wanted phones that no port covers yet ("Pixel 8, 8 Pro, 8a" lists three codenames).
const ported = new Set(devices.map((d) => d.codename));
export const unclaimed = wanted.filter((w) => !w.codename.split(/,\s*/).some((c) => ported.has(c)));

// Inline markdown to HTML: links, code, bold, italics. Relative links point
// into the main repository on GitHub.
export function inline(md: string): string {
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const href = (u: string) => {
    if (/^https?:/.test(u)) return u;
    if (u.startsWith("#")) return `${REPO_URL}/blob/main/${DOCS_DIR}/DEVICES.md${u}`;
    const path = new URL(u, `https://x/${DOCS_DIR}/`).pathname.slice(1);
    return `${REPO_URL}/blob/main/${path}`;
  };
  return esc(md)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, u) => `<a href="${href(u.replace(/&amp;/g, "&"))}">${t}</a>`)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[\s(])\*([^*]+)\*/g, "$1<em>$2</em>");
}
