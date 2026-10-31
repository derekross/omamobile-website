---
kind: 30023
d: 2026-10-31-pixel-8-pro-and-a-big-review-day
title: "Omarchy Mobile: the Pixel 8 Pro gets buttons and touch, the Pixel 9a's display code lands, and fifty pull requests merge"
summary: "The new lock screen and keyboard are merged, the modem starts more safely, NFC rests while the screen is off, the Pixel 8 Pro answers to its buttons and touchscreen, the 9a's 120 Hz and touch code is in the kernel, and two new Pixels get their first notes."
t: [omarchy, omarchymobile, linux, mobilelinux, arch, hyprland, pixel]
status: published 2026-10-31 (nostr/events/2026-10-31-pixel-8-pro-and-a-big-review-day.json)
---

About fifty pull requests have merged since yesterday's post, across the main repository and the kernel, from more contributors than ever. Here's what changed.

## On the Pixel 7 Pro

- **The new lock screen and the home-bar keyboard are merged.** Hands-on testing turned up fixes, which went in with them:
  - the lock always comes back to the glance view when the screen goes dark;
  - the clock follows your bar's 12/24-hour setting;
  - the fingerprint prompt only shows when a finger is enrolled;
  - a phone put to sleep with the screen on now turns the panel off once the lock is secure.
- **The home screen:** one bottom bar under both apps and the keyboard, so app tab bars are no longer drawn under the home pill. Widgets are square, the app switcher shows app names, and home widgets go idle when they're hidden. Widgets can now also ask which phone they're running on, so the same widget works on a 7 Pro and a 9a.
- **The modem starts more carefully.** It watches the modem's state through one open file, and the profile starts once per boot and refuses a second start. Both were tested on the Pixel 7 Pro last night, as was a normal start on the next boot.
- **NFC rests while the screen is off.** The radio stops searching for cards four seconds after the screen goes dark and resumes when it comes back on, as Android does. Thanks to W4HO-ham.
- **Pushed kernels keep their modules.** A boot-time cleanup used to delete every kernel's modules except the running one, so a newly pushed kernel could come up without its drivers. The kernel slot B boots next is now kept too.
- **The kernel fixes for the Pixel 9a were checked on the 7 Pro before merging:** touch across sleep, NFC on an rfkill block, and per-panel display timers. All three run cleanly.
- **Safer installs** (Gr-linkk). A signed release bundle now ties the root image's name and checksum to its signed manifest, and the installer checks that before it writes anything.
- **Package installs on the phone** handle versioned dependencies correctly now (jkjoplin). Phone and Messages show the right app names in notifications.
- **USB networking is now the last route out** on every phone, so a phone on Wi-Fi stays online when the cable comes out (robotosaith).

## Pixel 8 Pro

The Pixel 8 Pro had a big day, with two owners working side by side:

- **The Omarchy image boots** on it (greenbrettmichael).
- **The power and volume keys and the touchscreen work** on test kernels. The buttons are merged into the published kernel; touch is in review.
- **Notes from a second phone** add a different storage chip (Somnius).
- **A roadmap for the Pixel 8 Pro** sets out every subsystem, who is taking it, and the first read-only step for each.

## Pixel 9a

W4HO-ham's port moved again:

- **Kernel code merged:** the board's device tree, the 120 Hz display code with per-panel timers, the touchscreen and its sleep fix, NFC's card mode, and the panel's high-brightness mode for the under-display fingerprint sensor. The display's device tree comes next.
- **GNSS:** the first location fixes on the 9a are reported, and the write-up is in review.
- **A SIM test** is planned for 3 November.

## More phones

- **OnePlus 13** (mrlund): the device package and its boot images are merged. Its kernel is in review.
- **Pixel 10 Pro XL** (johnbrady833) and **Pixel 11 Pro XL** (nosmokinghere): first stock-facts notes, the starting point for any port.
- **Pixel 6** (Gr-linkk): a first native boot is in review.

The [devices list](https://omamobile.org/devices/) is updated with all of this.

To help, read the [contributor guide](https://github.com/derekross/omarchy-mobile/blob/main/CONTRIBUTING.md), open an issue for your phone, or follow along here.

Omarchy Mobile is a community project built on [Omarchy](https://omarchy.org). It is not an official Omarchy or Basecamp product.
