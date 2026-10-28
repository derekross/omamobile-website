---
kind: 30023
d: 2026-10-28-speakers-and-ports
title: "Omarchy Mobile: the speakers work, and the ports keep coming"
summary: "The Pixel 7 Pro's speakers are fixed, the Pixel 9a's chip support lands, and a flat battery overnight shows what sleep still needs."
t: [omarchy, omarchymobile, linux, mobilelinux, arch, hyprland, pixel]
status: published 2026-10-28 (nostr/events/2026-10-28-speakers-and-ports.json)
---

Thirty pull requests merged since yesterday's post. Here is what changed.

## On the Pixel 7 Pro

- **The speakers work.** They had been muting themselves and crackling under music. Both turned out to be the amplifiers' own settings: a temperature rule that fired on a reading that isn't reliable at our volume, and a boost converter that crackles when it runs lightly loaded. With the converter off and the rule moved to where it applies, music plays clean and loud enough to use, a little below stock's maximum. The speaker filter is now flat, with 6 dB of drive for streamed music, chosen by ear on the phone.
- **The NFC tile really switches NFC** off and on.
- **Earpiece mode for calls** is being tested: the top speaker alone at a safe level, which calls will need. The first tests found a crackle on speech, so it isn't merged yet.
- **A flat battery taught us something.** Left unplugged overnight with automatic sleep switched off, the phone stayed awake until the battery ran out. The low-battery action put it to sleep at 2 %, which was about ten minutes of charge, and nothing shut it down after that. The fix, being built now: power off at 5 %, and never sleep below 8 % on battery. Automatic sleep stays off by default until that and the remaining sleep tests pass.

## Community ports

- **Pixel 9a** (W4HO-ham): the Tensor G4's clock controllers landed as one fourteen-commit series, along with its panel driver, GPU clock, thermal sensors, UFS power handling, USB-C, Bluetooth and haptics. The phone's own device tree is in review next.
- **Pixel 7a** (latentoperator): UFS and the touchscreen are in the published kernel, and its device package installs an Arch root on the phone.
- **Pixel Fold** (boozedog): both panels' display triggers now come from the device description.
- **Pixel 6 Pro** (robotosaith): touch recovers from a stalled controller, and crash logs survive a reboot.
- **Pixel 4 XL** (HemangKumawat): its bring-up notes and results are in the repository.
- **New:** a Pixel 7 port, whose touch driver is merged and whose board device tree is in review, and a OnePlus 13 port proposed.

One rule got written down along the way: most drivers serve several phones, so a change for one phone has to leave the Pixel 7 Pro exactly as it is, or show why it shouldn't and be tested on it first.

The [devices list](https://omamobile.org/devices/) has every phone's status.

To help, read the [contributor guide](https://github.com/derekross/omarchy-mobile/blob/main/CONTRIBUTING.md), open an issue for your phone, or follow along here.

Omarchy Mobile is a community project built on [Omarchy](https://omarchy.org). It is not an official Omarchy or Basecamp product.
