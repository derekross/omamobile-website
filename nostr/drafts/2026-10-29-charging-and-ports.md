---
kind: 30023
d: 2026-10-29-charging-and-ports
title: "Omarchy Mobile: why a flat Pixel 7 Pro wouldn't charge, and the ports keep growing"
summary: "Three reasons a flat battery stayed flat, a fuel gauge that fired hundreds of interrupts per percent, and new hardware working on the Pixel 9a, Pixel 6 Pro and Pixel 7."
t: [omarchy, omarchymobile, linux, mobilelinux, arch, hyprland, pixel]
status: published 2026-10-29 (nostr/events/2026-10-29-charging-and-ports.json)
---

Twenty-nine pull requests merged since yesterday's post. Here is what changed.

## On the Pixel 7 Pro

- **A flat battery that wouldn't charge.** Plugged in at 0 %, the phone stayed at 0 %. There turned out to be three reasons:
  - **It slept with the screen on.** At 0 %, the low-battery action put the phone to sleep, but the lock screen was still lit while it slept. A lit screen draws more than the USB port supplies, so the battery drained even on the cable. The fix turns the screen off before the phone sleeps, once the lock screen is up. It is installed on the test phone and in review.
  - **The battery gauge was flooding the system.** Every time the charge crossed a whole percent, the gauge fired 300 to 460 interrupts in about a second, and each one woke the battery service. The chip keeps its alert line active for a third of a second after it's been answered, and our driver didn't wait for it. On a test kernel that waits, charging from 93 % to 100 % took one or two interrupts per percent, and sleep still works. It will be published after a test on the Pixel 6 Pro, which uses the same driver.
  - **The charger gave up after about 12 hours.** At the slow charge rate a laptop port gives, a full charge takes longer than the charger's safety timer, so it stopped at 92 % until a reboot. Google's driver switches that timer off; the same change is built and waiting for a test.
- **The home screen will take a mouse click.** App tiles ignored a mouse or a remote-desktop pointer, because the long-press handler caught the click. A fix with tests is in review.

## Community ports

- **Pixel 9a** (W4HO-ham): **fingerprint unlock works**, matching the enrolled finger and refusing other fingers. The MAX77779 charger driver landed, and the modem package can now load the libraries GNSS needs. The cause of NFC failing after sleep was found and the fix is in review. USB-C host mode and a device package are in progress.
- **Pixel 6 Pro** (robotosaith): **the charger, the torch and the vibration motor work**, the clock now reads the time reliably, and the display driver is in review.
- **Pixel 7** (nesmeck): the phone's device tree is in the published kernel, and its first device package merged. It also brings a way for contributors to build their own packages with a local signing key. The GPU, vibration, touchscreen and sleep are in review.
- **Pixel 7a** (FlorencioJP): Wi-Fi notes after a new boot test, and Bluetooth is in review.
- **Pixel Fold** (boozedog): a plan for the cover screen's touch.
- **New:** a Pixel 9 Pro Fold port has started, and a OnePlus 13 port is in review.

The [devices list](https://omamobile.org/devices/) has every phone's status, updated today.

To help, read the [contributor guide](https://github.com/derekross/omarchy-mobile/blob/main/CONTRIBUTING.md), open an issue for your phone, or follow along here.

Omarchy Mobile is a community project built on [Omarchy](https://omarchy.org). It is not an official Omarchy or Basecamp product.
