---
kind: 30023
d: 2026-11-07-calls-texts-and-data
title: "Omarchy Mobile: calls, texts and data on the Pixel 7 Pro"
summary: "The Pixel 7 Pro's modem works through the Phone and Messages apps, voice typing and fingerprint work out of the box, and the first release is being respun to hold Omarchy at 4.0.6 while our patches catch up with 4.5. Contributors brought the Pixel 9a its first calls and moved the Pixel 7, 6, 8 Pro and 8a forward."
t: [omarchy, omarchymobile, linux, mobilelinux, arch, hyprland, pixel]
status: published 2026-11-07 (nostr/events/2026-11-07-calls-texts-and-data.json)
---

The Pixel 7 Pro is now a phone: it makes and takes calls, sends and receives texts, and uses mobile data, through our own Phone and Messages apps. Omarchy Mobile users have already been texting each other, phone to phone. Here's what changed since the last post on 2 November.

## Pixel 7 Pro: the modem works

- **Calls, texts and mobile data.** Tested on a Verizon-network SIM: VoLTE calls both ways, texts over IMS, and mobile data as a fallback behind Wi-Fi. The phone registers on the network in seconds. Other networks are untested so far.
- **Call audio through the earpiece**, at every speaker level, on by default on a fresh install.
- **No APN to type.** The carrier's settings are chosen from the SIM at boot. The Mobile network page under Setup shows them and lets you correct them.
- **On by default.** Once the phone has been provisioned with Google's modem files from your own factory image, the modem stack starts at every boot. The cellular indicators in the bar follow it, and the Mobile data tile says why the modem is off when it is.
- **The modem's own settings survive a reboot.** The modem writes some of its state (network and carrier data) as it runs. Linux never writes the radio partitions, so those writes now go to a per-phone overlay on the phone's own storage, checked against your backup at every start.
- **Phone, Contacts and Messages are in every image.**

## Pixel 7 Pro: out of the box

- **Voice typing works on a fresh install**, with nothing to set up.
- **Fingerprint is on by default** once the phone is provisioned. Its start is guarded so the phone's calibration data is only ever read.
- **The louder speaker level** is used on a fresh install when the phone's speaker firmware is the verified one.
- **Weather widgets** now use Open-Meteo, and weather works with Location turned on.
- **A tap on a screenshot opens it** in a touch-friendly image viewer.
- **The install terminals fit the phone's screen**, and a fresh home screen starts with Omawrite.

## The first release

The first developer preview for the Pixel 7 Pro was built on 3 November. Before it shipped, Omarchy 4.5 reached Omarchy's stable channel, and our patches for Omarchy don't apply to it yet. Without them the lock screen loses its PIN pad and `omarchy update` stops handing over to the phone's updater.

- **Phones stay on Omarchy 4.0.6 for now.** Our package repository now carries Omarchy's own 4.0.6 packages, unchanged, and it comes first on the phone, so `omarchy update` keeps phones on 4.0.6 while everything else keeps updating. Phones installed before 3 November also need a newer aquamarine than Omarchy's stable channel has before they can update; the same mechanism will carry it.
- **The release is being respun** as 2026.11.06, with Omarchy held at 4.0.6. It gets its attended test install on the reference phone next.
- **The move to Omarchy 4.5** is in review: a contributor ported our patches to it, and they apply cleanly. It needs a few more pieces and a run on the phone first.
- **The installer is safer:** it refuses a phone that's already running from slot B unless you're reinstalling, and the guide covers phones without A/B slots.

## Pixel 9a

W4HO-ham's port had its first SIM test, then calls:

- **Texts and data on its carrier's network**, then calls with **speakerphone audio** (opt-in for now).
- **Location** through GeoClue.
- **Sleep:** an overnight series where 126 of 127 sleeps woke.
- **The GNSS link** is in the kernel.

## More

- **Pixel 7** (angelrenefm, nesmeck): Bluetooth, the rear flash, the fingerprint sensor's description and reboots to fastboot in the kernel; the camera start, the torch, AVB-signed boot images and the radio-partition backup in the device package. Wi-Fi and fingerprint are in review. A new CPU power model makes scheduling more energy-aware on the Pixel 7 and 7 Pro.
- **Pixel 6 Pro** (robotosaith): the GPU now scales its clock and stays cool through the power manager, Bluetooth audio works, reboots are clean, sleep moves to testing, and the speakers run through their protection firmware.
- **Pixel 8 Pro** (Somnius): the radio-partition backup, a charger baseline, and a guide to adding keyboard layouts.
- **Pixel 8a** (aninmucek): first light, with USB, SSH and a picture on the screen, then the phone's storage with the read-only guard in place.
- **Pixel 7a** (latentoperator, FlorencioJP): Bluetooth in the kernel and a Wi-Fi result recorded.
- **Everyone:** Bluetooth LE keyboards, mice and headset buttons work (nesmeck), and the developer tools got several fixes from only21mil and Gr-linkk.

To help, read the [contributor guide](https://github.com/derekross/omarchy-mobile/blob/main/CONTRIBUTING.md), open an issue for your phone, or follow along here.

Omarchy Mobile is a community project built on [Omarchy](https://omarchy.org). It is not an official Omarchy or Basecamp product.
