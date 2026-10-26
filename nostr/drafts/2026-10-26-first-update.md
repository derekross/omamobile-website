---
kind: 30023
d: 2026-10-26-first-update
title: "Omarchy Mobile: where it stands"
summary: "Native Omarchy on a Pixel 7 Pro, with a mainline kernel and no Android underneath: what works today, what's next, and the community ports."
image: https://blossom.ditto.pub/14c5363bcf32a536c0d992c897f1f65e211aa94c39005d322f6eb6faf62cd374.png
t: [omarchy, omarchymobile, linux, mobilelinux, arch, hyprland, pixel]
status: DRAFT, not published
---

Omarchy Mobile runs native Omarchy on phones: Arch Linux ARM, Hyprland and Omarchy's own apps, on a mainline Linux kernel, with no Android underneath. This account will post the project's updates. This first one says where things stand.

## On the Pixel 7 Pro today

The Pixel 7 Pro is the reference phone, and it is what we use every day while we build. Working on it now:

- the display at 120 Hz, the GPU (Mali-G710 on Panthor) and touch;
- Wi-Fi, Bluetooth audio, USB networking;
- the battery, charging and haptics;
- the torch, the sensors with auto-rotate, GPS and NFC;
- fingerprint unlock, which is opt-in;
- all four cameras, in our own camera app, [omacam](https://github.com/derekross/omacam). It has Night mode and HDR, which merge a burst of raw frames on the phone. The telephoto can't focus yet.

The speakers and microphones work but still sound quiet and thin, and that's being tuned.

`omarchy update` works on the phone. It runs Omarchy's own update, with the phone's own safeguards, and the phone's packages come from a signed repository next to Omarchy's.

## Next: the modem

The modem boots Google's firmware and talks to our own client. This week we got it ready for its first SIM:

- A locked SIM is now reported at once.
- Mobile data keeps working if VoLTE doesn't register.
- Call audio stays off until the earpiece path is safe.

The first live SIM test comes next. We'll report what it shows, and we won't call anything working until it does. Sleep with the screen off passes repeated tests, but isn't on by default yet.

## Your phone, too

Community ports are under way:

- **Pixel 8 Pro:** boots the mainline kernel with USB and SSH (greenbrettmichael).
- **Pixel 9a:** reached first light (W4HO-ham).
- **Pixel Fold:** boots to its cover screen (boozedog).
- **Pixel 7a:** has its first-light board in review (latentoperator).
- **Pixel 6:** has its descriptor and boot images (bilacc).
- **Pixel 6 Pro:** has its device package and tools in review (robotosaith).
- **Pixel 4:** runs a first-light probe (wirelessjoe).
- **POCO F3:** the first non-Pixel port, proposed by bc-abe.

The [devices list](https://github.com/derekross/omarchy-mobile/blob/main/docs/DEVICES.md) has every phone's status and a wanted list with a starting point for each. Every port follows the same safety model: stock Android stays on its own slot as the way back, and only our slot and the user data are ever written.

To help, read the [contributor guide](https://github.com/derekross/omarchy-mobile/blob/main/CONTRIBUTING.md), open an issue for your phone, or just follow along here.

Omarchy Mobile is a community project built on [Omarchy](https://omarchy.org). It is not an official Omarchy or Basecamp product.
