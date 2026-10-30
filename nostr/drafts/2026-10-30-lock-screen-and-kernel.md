---
kind: 30023
d: 2026-10-30-lock-screen-and-kernel
title: "Omarchy Mobile: a new lock screen, charging fixed, and the Pixel 7 Pro kernel goes public"
summary: "A glance-first lock screen in Omarchy's own style, a keyboard you can summon from the home bar, the charging fixes, 165 kernel commits ready to publish, and a busy day for the Pixel 9a and Pixel 7."
t: [omarchy, omarchymobile, linux, mobilelinux, arch, hyprland, pixel]
status: published 2026-10-30 (nostr/events/2026-10-30-lock-screen-and-kernel.json)
---

Sixteen pull requests merged since yesterday's post, and the Pixel 7 Pro got a new lock screen, a better keyboard and working charging. Here is what changed.

## On the Pixel 7 Pro

- **A new lock screen.** It now opens on a glance view: the time, the date and your notifications, grouped by app. Swipe up or tap for the PIN pad. The fingerprint works from both views. It's built entirely from Omarchy's own lock and notification parts, so it follows whatever theme you have set. A switch hides message text while the phone is locked, and nothing on the lock acts on a notification. It runs on the test phone and is in review.
- **The keyboard, from the home bar.** The floating "hide keyboard" button used to sit right over a terminal's input line. It's gone. Double-tap the bar at the bottom of the screen to show or hide the keyboard, or tap the new hide key under the keyboard. A one-time tip explains it the first time the keyboard opens. In review, tested on the phone.
- **Charging works.** Yesterday's three charging problems are fixed:
  - the battery gauge no longer floods the system with interrupts;
  - the charger's 12-hour safety timer is off, as in Google's driver;
  - a full phone on the cable now reads as plugged in, where before it read as running on battery.

  The phone charged from 21 % to full overnight on a laptop port, and charging resumes after a replug. A phone run completely flat still has trouble on a laptop port, tracked in issue #169.
- **Slot B on a stock phone.** Boot images now carry the verified-boot footers a stock Pixel 7 Pro's bootloader looks for. Thanks to jkjoplin, who found and fixed it. We learned the hard way that once a phone has booted these images, older images without footers no longer start, so always build with the current tools.
- **Fixes in review:**
  - The lock screen retried the fingerprint reader all night when no finger was enrolled (found by jkjoplin, about 12 % more battery draw). The fix brings in Omarchy's own upstream fix.
  - The camera data tool now works with the newest factory image (CP3A) as well as CP2A.
  - USB networking becomes the last route out, so the phone stays online over Wi-Fi when the cable comes out (by robotosaith, tested on two phones).

## The Pixel 7 Pro kernel goes public

The kernel the test phone runs had grown 328 commits ahead of the published one. They're now cleaned up into 165 commits in eight pull requests: charging, audio, display, Wi-Fi, the modem, cameras, NFC, and GNSS with fingerprint. The curated kernel booted on the Pixel 7 Pro with every check passing. Once the shared drivers are checked on a Pixel 6 Pro, they merge in order, and every Pixel 7 Pro owner gets the same kernel the test phone runs.

## Community ports

- **Pixel 9a** (W4HO-ham): the phone's bring-up is now a device package. Fingerprint unlock is recorded as working. USB-C host mode through the Type-C driver has a plan and a next run. A detailed audit of sleep power drain is in. GNSS is parked after 44 tries until the modem side is understood. There's also a new safety rule: on the 9a, falling back to slot A costs the Linux install, so slot B is only ever updated with `push`.
- **Pixel 7** (nesmeck): the GPU, the vibration motor and suspend-to-idle are in the device package, and the touchscreen is in the published kernel.
- **OnePlus 13** (mrlund): the port's two-stage boot is in review.
- **Tools:** `phone-ssh` can now share one connection while still reaching other endpoints (wirelessjoe), and the battery test tool can suspend through systemd.

The [devices list](https://omamobile.org/devices/) has every phone's status, updated today.

To help, read the [contributor guide](https://github.com/derekross/omarchy-mobile/blob/main/CONTRIBUTING.md), open an issue for your phone, or follow along here.

Omarchy Mobile is a community project built on [Omarchy](https://omarchy.org). It is not an official Omarchy or Basecamp product.
