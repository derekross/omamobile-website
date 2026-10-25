# AGENTS.md: working on omamobile.org

This repository is public, and so is everything the site says. The rules of the main repository's [AGENTS.md](https://github.com/derekross/omarchy-mobile/blob/main/AGENTS.md) apply here as well. These are the rules specific to the site.

## Copy

- **Lead with the goal:** native Omarchy as your phone. Don't put caveats in headlines or on the landing page. Status belongs on the device pages.
- **Never claim a feature works before it is verified on hardware.** Device status comes from the main repository's `docs/DEVICES.md`. Never hand-copy it into copy.
- **Don't name or compare other mobile Linux projects or operating systems in public copy.** If a comparison seems needed, ask the maintainer first.
- **Omarchy Mobile is a community project built on Omarchy.** Never present it as an official Omarchy or Basecamp product.
- Name contributors by their GitHub handle.

## Data and assets

- **Never commit identifying data:** MAC and Bluetooth addresses, serial numbers, IMEIs, SSIDs, account names, `getprop` dumps. In examples, use placeholders such as `<SERIAL>`, `<SSID>` and `aa:bb:cc:dd:ee:ff`. Check every screenshot for these.
- **Never commit or host Google firmware or vendor binaries,** not even as a download. Users supply their own.
- Cite only properly licensed sources. Attribute Omarchy's assets and fastboot.js.

## Installer

- Write only slot B's boot images and `userdata`, through the same allowlist as `tools/install-phone`. Never run an unsuffixed flash, and never touch the bootloader, radio, `vbmeta`, `devinfo`, `persist`, `efs*` or `modem*`.
- Any change to the installer's write path needs the maintainer's review and a test on real hardware before it is deployed.

## Workflow

- Build and preview locally. Nothing is deployed without the maintainer's go.
- Commit messages: an area prefix (`site: …`, `news: …`, `installer: …`), then a body that explains why.
- AI agents never add `Signed-off-by:`.
