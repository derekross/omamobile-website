---
kind: 30023
d: 2026-11-09-the-first-release
title: "Omarchy Mobile: the first release is out"
summary: "The first developer preview of Omarchy Mobile, 2026.11.08 for the Pixel 7 Pro, is published: one signed download, a tagged kernel, and updates through omarchy update. Double tap to wake landed, the move to Omarchy 4.5 is in the packages, and contributors moved the Pixel 9a, 8 Pro, 7, 8a, OnePlus 6 and Xiaomi Mi 8 forward."
t: [omarchy, omarchymobile, linux, mobilelinux, arch, hyprland, pixel]
status: published 2026-11-09 (nostr/events/2026-11-09-the-first-release.json)
---

Omarchy Mobile has its first release. The developer preview 2026.11.08 for the Pixel 7 Pro went out on 9 November: a signed download, a tagged kernel, and a phone that updates itself with `omarchy update`. Here's what changed since the last post on 7 November.

## The first release

- **2026.11.08, a developer preview for the Pixel 7 Pro.** One signed file from [pkgs.omamobile.org](https://pkgs.omamobile.org/releases/cheetah/2026.11.08/), with the [release notes](https://github.com/derekross/omarchy-mobile/releases/tag/release-2026.11.08) and the [install guide](https://github.com/derekross/omarchy-mobile/blob/main/docs/INSTALL.md). You need a Pixel 7 Pro with an unlocked bootloader and a Linux computer.
- **It installs beside Android.** The installer writes only slot B's boot images and the data partition. Stock Android stays on slot A as the way back, and the radio and calibration partitions are never written.
- **Updates come through `omarchy update`,** kernel included: the kernel is a package, and the phone writes a new one to slot B and asks for a restart.
- **The kernel source is public at the tag** `kernel-2026.11.08` before any binary ships.
- **Google's firmware is not included,** and never will be. After the first start, one tool takes it from your own factory image, for Wi-Fi, sound, the modem, the cameras and fingerprint. A guided installer that does this step for you is the next release's goal.
- **It was installed and checked on the reference phone first:** the modem on the network, Wi-Fi, the fingerprint sensor, an update, and a restart into the boot image the phone wrote itself.
- **It is a developer preview.** The release notes list what works and what doesn't yet: auto-sleep ships off, Bluetooth headset calls and USB host mode are missing, and calls are tested on one network.

## Pixel 7 Pro

- **Double tap to wake** (angelrenefm). A double tap on the dark screen wakes the lock screen. A single touch, a pocket or a covered sensor leaves it dark.
- **`reboot-to bootloader` reaches fastboot by itself,** with no buttons to hold.
- **A low battery starts charging sooner,** and a touchscreen variant that didn't answer at boot now works.
- **The shell got smoother** (marselnenaj, den-kloot, Gr-linkk): the notification shade stays steady while you drag it, Quick Settings opens with notifications first, Back ticks once when the gesture arms, quick double presses of Power no longer trip over each other, recent apps keep your place when a window closes, and the home strip appears under the keyboard.
- **The battery's state** (charging, full, not charging) shows in the shell, and the Hotspot tile brings what it needs.
- **The installer gives the rescue shell your SSH key** from the first boot (only21mil).
- **Omarchy 4.5 is closer.** The package that carries our Omarchy patches now holds two sets, one for 4.0.6 and one for 4.5, and picks by the Omarchy it finds (marselnenaj, tested on 4.5 by jkjoplin). Phones stay on 4.0.6 until the rest is ready.
- **Waydroid** (azazelpy): the opt-in Android container's device rules now let Android start while the phone's storage stays out of reach.
- **A phone can be driven over SSH from a script,** opt-in (Somnius).

## Pixel 9a

W4HO-ham's port keeps moving:

- **Phone and Messages** now work through the same apps as the Pixel 7 Pro.
- **In the published kernel:** the modem link, Wi-Fi, the audio processor with the speaker amplifiers, and the secure-world services they need.
- **The main camera focuses** (den-kloot).
- **Sleep:** the two ways a sleep could end badly were found. One fix is in review, and the other became a small sleep hook.

## Pixel 8 Pro

- **The display driver is in the kernel,** with the panel at 120 Hz, and so is **Wi-Fi** (greenbrettmichael).
- **Sound starts at boot** from a packaged unit (Somnius), and the NFC controller has its clock.
- **A third phone joined** with its first facts (gitColinX).

## More

- **Pixel 7** (angelrenefm): fingerprint and Wi-Fi at boot are in, the speakers can run without the phone's calibration file, and rotation no longer flashes.
- **Pixel 8a** (aninmucek): its device package, with the storage plan and the radio-partition backup.
- **OnePlus 6** (matthewjaybarr-png): a first descriptor and boots from RAM. The storage guard learned to cover a second disk for it, off for every other phone.
- **Xiaomi Mi 8** (quatrixone): boots from RAM with the storage guard holding every partition read-only, its touchscreen driver in the kernel, and the recovery record a phone without A/B slots needs before anything is written.
- **Pixel 11 Pro XL** (nosmokinghere) and **Pixel 6a** (latentoperator): notes and first pieces in review.
- **Behind the scenes:** packages now build every night on a dedicated build server, which checks Omarchy's signing keys itself, and the developer tools got a long list of fixes from only21mil.

To help, read the [contributor guide](https://github.com/derekross/omarchy-mobile/blob/main/CONTRIBUTING.md), open an issue for your phone, or follow along here.

Omarchy Mobile is a community project built on [Omarchy](https://omarchy.org). It is not an official Omarchy or Basecamp product.
