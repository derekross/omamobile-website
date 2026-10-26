# omamobile.org: design decisions

Status (2026-10-26): the landing page, devices and news are live at omamobile.org. Each section gives the decision, then the reason.

## Stack

- **Astro, static output.** Omarchy's own site uses Astro, and it lets the content collections load the main repository's Markdown directly. The site ships no client JavaScript except the theme switcher and, later, the installer.
- **Content comes from the main repository.** The build reads a pinned checkout of `derekross/omarchy-mobile`: `docs/DEVICES.md` becomes validated device data, and the docs pages come from its Markdown. Every status on the site therefore matches the repository, and a status the data contradicts fails the build.
- **Hosting:** nginx with Let's Encrypt on the maintainer's VPS. GitHub Actions builds and rsyncs `dist/` on every push to `main` and every six hours.

## Look

- **Omarchy's themes, switchable.** `scripts/gen-themes.py` turns twelve of Omarchy's theme palettes (`colors.toml`) into the site's colour tokens, with contrast raised where a palette's text would be too faint. Tokyo Night is the default, and the footer has a theme picker, as on omarchy.org. The accent is each theme's own accent: blue on Tokyo Night, as on the phone, rather than omarchy.org's green, so the two sites look related, not the same.
- **Omarchy's type:** JetBrains Mono for headings, navigation and status; Geist for body text (both OFL, self-hosted through Fontsource).
- **One bold element:** a real screenshot of the phone in the hero. Everything else is quiet: ruled lists, not cards; left-aligned.
- **Status colours mean status:** green works, yellow partial or testing, violet in progress, a hollow dot not yet.
- Omarchy's look: its themes, fonts and logo files, with attribution. Omarchy is MIT, so reusing its code and assets is covered. MIT grants no trademark rights, so the site says "Omarchy Mobile is a community project built on Omarchy", links back, and never presents itself as an official Basecamp product.
- Real screenshots and photos from the phones, each scrubbed for identifiers: SSIDs, Bluetooth device names, notification contents, account names and serial numbers.

## News

- **Nostr-native.** News, project updates and blog posts are NIP-23 long-form events from the project's own key. `npm run build` first runs `scripts/fetch-news.mjs`, which fetches them from relays, checks each signature and author, and caches them in `nostr/events/`; the site builds from that cache only, so a down relay breaks nothing (`NEWS_OFFLINE=1` skips the fetch). The RSS/Atom feed is generated from the same events. Each post links to its event (`naddr`) for replies and zaps.
- Contributors are named by their GitHub handle.
- The project's key signs ([nostr/npub.txt](../nostr/npub.txt)). Posts made before the account existed were republished from it with their original dates.
- **Staying current.** Device status and news are read at build time, so a rebuild picks up both. The deploy workflow rebuilds every six hours, so both reach the site with no manual step.

## Copy

- Lead with the goal: native Omarchy as your phone. Per-feature status lives on the device pages, generated from `DEVICES.md`.
- Never claim a feature works before it is verified on hardware. Calls, SMS and mobile data wait on a SIM test.

## Downloads (later)

- Large files (root images, their sparse chunks) are served from the VPS.
- One signing key: the `[omamobile]` repository key signs packages and release images. The installer pins its fingerprint.
- No Google firmware is hosted, ever. The phone copies Google's files read-only from its own stock slot A, and the user's own factory image is the fallback.

## Web installer (later)

- WebUSB, with a vendored, trimmed and pinned copy of fastboot.js's protocol and sparse code, and attribution.
- It writes only slot B's boot images (`boot_b`, `init_boot_b`, `vendor_boot_b`, `vendor_kernel_boot_b`, `dtbo_b`) and `userdata`, through an allowlist that matches `tools/install-phone`. It never runs an unsuffixed flash and never touches the bootloader, radio, `vbmeta` or anything else. Slot A's stock Android is the way back.
- Before any write it checks the snapshot (Virtual A/B) state and which slot stock is on, and it refuses if either is unsafe.
- The first step is read-only: it shows the phone's state and changes nothing.
- It verifies the signature on `SHA256SUMS` in the browser, then each chunk's checksum before sending it.
