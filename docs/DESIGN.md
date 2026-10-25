# omamobile.org: design decisions

Status (2026-10-25): decided, nothing built. Each section gives the decision, then the reason.

## Stack

- **Astro, static output.** Omarchy's own site uses Astro, and it lets the content collections load the main repository's Markdown directly. The site ships no client JavaScript except the theme switcher and, later, the installer.
- **Content comes from the main repository.** The build reads a pinned checkout of `derekross/omarchy-mobile`: `docs/DEVICES.md` becomes validated device data, and the docs pages come from its Markdown. Every status on the site therefore matches the repository, and a status the data contradicts fails the build.
- **Built and tested locally first.** The VPS (nginx, Let's Encrypt) comes later.

## Look

- Omarchy's look: its themes, fonts and logo files, with attribution. Omarchy is MIT, so reusing its code and assets is covered. MIT grants no trademark rights, so the site says "Omarchy Mobile is a community project built on Omarchy", links back, and never presents itself as an official Basecamp product.
- Real screenshots and photos from the phones, each scrubbed for identifiers: SSIDs, Bluetooth device names, notification contents, account names and serial numbers.

## News

- **Nostr-native.** News, project updates and blog posts are NIP-23 long-form events. The build fetches them from relays and caches them in the repository, so builds are reproducible and a down relay breaks nothing. The RSS/Atom feed is generated from the same events. Each post links to its event (`naddr`) for replies and zaps.
- Contributors are named by their GitHub handle.
- Open: whether a project key or the maintainer's key signs.

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
