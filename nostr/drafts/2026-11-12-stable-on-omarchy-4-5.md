---
kind: 30023
d: 2026-11-12-stable-on-omarchy-4-5
title: "Omarchy Mobile: the stable channel is on Omarchy 4.5"
summary: "The stable channel now carries Omarchy 4.5. A Pixel 7 Pro installed from the first release took the update through its Updates sheet and restarted into it. The Settings app now comes with every phone, and the guided installer did its first whole install."
t: [omarchy, omarchymobile, linux, mobilelinux, arch, hyprland, pixel]
status: published 2026-11-12 (nostr/events/2026-11-12-stable-on-omarchy-4-5.json)
---

The stable channel of Omarchy Mobile is on Omarchy 4.5 as of 12 November. Phones installed from the first release get it with their next update.

## What we did before moving stable

Omarchy 4.5 has been on the development channel since 11 November. Before stable got it, we ran the update the way an owner will:

- **A fresh install of the release.** The Pixel 7 Pro was erased and installed from release 2026.11.08, which is Omarchy 4.0.6 on the stable channel.
- **The update from the phone.** It took the update from its Updates sheet: Omarchy 4.5, the phone's own packages, and a new boot image that the phone wrote and checked itself.
- **A restart into it.** The phone came back on the new boot image with its modem, fingerprint reader, sound and sensors up, and our read-only check of the phone passed.

Stable then got exactly the set of packages that phone had tested.

## How to get it

Open Updates, or run `omarchy update`. It asks for a restart at the end, and it takes a while: it carries everything since the release.

Two things to know:

- **You may see two error lines about "temporary Omarchy sudo grants" in the update's log.** They appear once, during this update only, and changed nothing on the phone we tested.
- **There is no way back to 4.0.6** short of installing again.

A release image built on 4.5 is being put together now. Until it's out, a new install starts on 4.0.6 and reaches 4.5 at its first update.

## Also new

- **Settings comes with every phone.** It was missing from fresh installs; it now arrives with the phone's apps, at this update too.
- **The guided installer did its first whole install:** one command that writes the phone, waits for its first start, backs up its radio partitions and adds its firmware. The run found three rough edges, and the one that ended it early is fixed.
- **`reboot-to --help` prints its usage** on the Pixel 7 Pro instead of restarting the phone.

It's tested on the Pixel 7 Pro. If you run another phone, tell us how the update goes.

To help, read the [contributor guide](https://github.com/derekross/omarchy-mobile/blob/main/CONTRIBUTING.md), open an issue for your phone, or follow along here.

Omarchy Mobile is a community project built on [Omarchy](https://omarchy.org). It is not an official Omarchy or Basecamp product.
