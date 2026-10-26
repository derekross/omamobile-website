// Fetches the project's news (NIP-23 long-form posts) from Nostr relays into
// nostr/events/<d>.json. The site builds from those files only, so a build
// works offline and a down relay changes nothing; this script just brings
// the cache up to date. Every event is signature-checked and must come from
// the project's key. NEWS_OFFLINE=1 skips the fetch.
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { verifyEvent } from "nostr-tools/pure";
import * as nip19 from "nostr-tools/nip19";

const ROOT = resolve(import.meta.dirname, "..");
const DIR = resolve(ROOT, "nostr/events");
const NPUB = readFileSync(resolve(ROOT, "nostr/npub.txt"), "utf8").trim();
const PUBKEY = nip19.decode(NPUB).data;
const RELAYS = ["wss://relay.ditto.pub", "wss://relay.primal.net", "wss://relay.damus.io", "wss://nos.lol"];

if (process.env.NEWS_OFFLINE) {
  console.log("news: offline, using the cache");
  process.exit(0);
}

const dTag = (e) => e.tags.find((t) => t[0] === "d")?.[1];

// The cache, by d tag.
mkdirSync(DIR, { recursive: true });
const cached = new Map();
for (const f of readdirSync(DIR).filter((f) => f.endsWith(".json"))) {
  const e = JSON.parse(readFileSync(resolve(DIR, f), "utf8"));
  cached.set(dTag(e), e);
}

// One REQ per relay, closed at EOSE or after a timeout. A relay that fails
// to connect just contributes nothing.
function query(url, filter, ms = 8000) {
  return new Promise((done) => {
    const got = [];
    let ws;
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      try { ws?.close(); } catch {}
      done(got);
    };
    const timer = setTimeout(finish, ms);
    try {
      ws = new WebSocket(url);
    } catch {
      return finish();
    }
    ws.onopen = () => ws.send(JSON.stringify(["REQ", "news", filter]));
    ws.onmessage = (m) => {
      let msg;
      try { msg = JSON.parse(m.data); } catch { return; }
      if (msg[0] === "EVENT" && msg[1] === "news") got.push(msg[2]);
      if (msg[0] === "EOSE" || msg[0] === "CLOSED") finish();
    };
    ws.onerror = () => finish();
    ws.onclose = () => finish();
  });
}

const results = await Promise.all(RELAYS.map((r) => query(r, { kinds: [30023], authors: [PUBKEY] })));
const events = results.flat();

let changed = 0;
for (const e of events) {
  const d = dTag(e);
  // Only the project's own, correctly signed posts with a d tag and a safe file name.
  if (e.pubkey !== PUBKEY || !d || !/^[a-z0-9-]+$/.test(d) || !verifyEvent(e)) continue;
  const old = cached.get(d);
  if (old && old.created_at >= e.created_at) continue; // a replaceable event: newest wins
  cached.set(d, e);
  const { id, pubkey, created_at, kind, tags, content, sig } = e;
  writeFileSync(resolve(DIR, `${d}.json`), JSON.stringify({ id, pubkey, created_at, kind, tags, content, sig }) + "\n");
  changed++;
}
console.log(`news: ${events.length} event(s) from relays, ${changed} new or updated, ${cached.size} cached`);
process.exit(0);
