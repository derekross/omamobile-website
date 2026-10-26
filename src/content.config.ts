// News: the project's NIP-23 posts, from the cache scripts/fetch-news.mjs keeps
// in nostr/events/. Each post's Markdown is rendered at build time.
import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import * as nip19 from "nostr-tools/nip19";

const DIR = resolve("nostr/events");
const RELAY = "wss://relay.ditto.pub";

const news = defineCollection({
  loader: {
    name: "nostr-news",
    load: async ({ store, renderMarkdown, parseData }) => {
      store.clear();
      for (const f of readdirSync(DIR).filter((f) => f.endsWith(".json"))) {
        const e = JSON.parse(readFileSync(resolve(DIR, f), "utf8"));
        const tag = (name: string) => e.tags.find((t: string[]) => t[0] === name)?.[1];
        const id = tag("d");
        const published = Number(tag("published_at") ?? e.created_at);
        const data = await parseData({
          id,
          data: {
            title: tag("title") ?? id,
            summary: tag("summary") ?? "",
            image: tag("image"),
            published: new Date(published * 1000),
            naddr: nip19.naddrEncode({ kind: e.kind, pubkey: e.pubkey, identifier: id, relays: [RELAY] }),
          },
        });
        store.set({ id, data, rendered: await renderMarkdown(e.content) });
      }
    },
  },
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    image: z.string().url().optional(),
    published: z.date(),
    naddr: z.string(),
  }),
});

export const collections = { news };
