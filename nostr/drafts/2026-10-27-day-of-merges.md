---
kind: 30023
d: 2026-10-27-day-of-merges
title: "Omarchy Mobile: a day of merges"
summary: "53 pull requests from seven people in 24 hours: sleep on the Pixel 7 Pro, touch fixes, and four community ports moving at once."
t: [omarchy, omarchymobile, linux, mobilelinux, arch, hyprland, pixel]
status: published 2026-10-27 (nostr/events/2026-10-27-day-of-merges.json)
---

Yesterday's post said where things stand. Since then, 53 pull requests from seven people have merged across the main repository, the kernel and the camera app. Here is what changed.

## On the Pixel 7 Pro

- **Sleep.** The phone can now go to sleep when the screen turns off and wake on the power key. It's off by default while it collects more days of use; turning it on is one toggle.
- **Touch.** Three batches of touch work landed: the lock engages on the first try, notifications swipe out of the shade, the dock hides under apps, and the quick settings, back gesture and window handling stop doing things that could break the phone.
- **The lock screen stays upright** when the phone is held sideways, and the desktop comes back to landscape on unlock. This came from the Pixel 9a port and was checked on the 7 Pro before merging.
- **Speakers.** We found why they kept going quiet: the bottom amplifier's protection model runs away when its dynamic range control is on below stock gain. The fix is in review.

## Community ports

- **Pixel 6 Pro** (robotosaith): the device package, provisioning tools and plans merged, and so did four kernel series: the touchscreen over SPI, Bluetooth, power domains with unused blocks off, and thermal sensors with CPU cooling. It boots to Omarchy's Hyprland on the Mali-G78. One open item: Bluetooth after a warm reboot.
- **Pixel 9a** (W4HO-ham): ten kernel changes for Tensor G4, from the board bindings and pin wake-ups to the battery gauge and a long-standing NFC teardown deadlock, plus the fingerprint file list, the main camera's sensor data, its lens table in the camera app and an audio profile.
- **Pixel 8 Pro** (greenbrettmichael): the Tensor G3 device tree, pin controllers and a PMU access table merged, with the device package and its UFS plan.
- **Pixel Fold** (boozedog): the cover's touch chip answers and its touch reports are in the kernel; the power key works.
- **Pixel 7a** (latentoperator): the boot framebuffer, descriptor and on-screen console merged. Two owners of a 7a traced its Wi-Fi chip's refusal to load firmware to the chip's own boot ROM, at its authentication step, with every host-side difference tested one boot at a time. It's parked there until someone with a second, rooted 7a can read one register from stock.
- **Pixel 7** (nesmeck): the first port opened, with a way for contributors to build images under their own key.
- **Pixel 4 and POCO F3:** two policy questions those ports were waiting on are settled. Marking a slot bootable on a Qualcomm phone, which means writing the partition table, is a named manual exception per device, never a service. And user data is only ever written through the one guarded installer.

The [devices list](https://omamobile.org/devices/) on the site now reads straight from the repository, so it updates as ports merge.

## Behind the scenes

The review checklist grew by 25 lessons from this round, each one from a real review, and the daily package publish moved to a build machine and promptly broke on the first run; that's fixed too.

To help, read the [contributor guide](https://github.com/derekross/omarchy-mobile/blob/main/CONTRIBUTING.md), open an issue for your phone, or follow along here.

Omarchy Mobile is a community project built on [Omarchy](https://omarchy.org). It is not an official Omarchy or Basecamp product.
