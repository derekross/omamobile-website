---
kind: 30023
d: 2026-11-02-kernel-updates-and-the-first-release
title: "Omarchy Mobile: kernel updates through pacman, and the first release is close"
summary: "The Pixel 7 Pro's kernel now updates like any other package, with a way back. The release tools are done, the first developer preview is being built and test-installed, Hyprland 0.57 is in, and contributors moved the Pixel 9a, 7, 8 Pro, 6a and 8a forward."
t: [omarchy, omarchymobile, linux, mobilelinux, arch, hyprland, pixel]
status: published 2026-11-02 (nostr/events/2026-11-02-kernel-updates-and-the-first-release.json)
---

Today was about getting ready to ship. The Pixel 7 Pro can now take a new kernel through a normal system update, the tools that build and check a release are finished, and the first release is being built and test-installed. Here's what changed since yesterday's post.

## The first release is close

The first release, 2026.11.02, is a developer preview for the Pixel 7 Pro. It isn't out yet: it is being built and test-installed on the reference phone now. Everything below is what it needed.

- **The release kernel is tagged.** The kernel the test phone runs is now published in full: Wi-Fi, the modem, audio and sensors, NFC, GNSS, fingerprint, the speaker amplifiers and GPU throttling. Its first release tag is kernel-2026.11.01.
- **Kernel updates through pacman.** The kernel is now a package, `linux-omamobile`. When `omarchy update` brings a new one, `omamobile-boot-update` builds the phone's boot images from it, writes them to slot B only, reads every image back, and keeps the old ones for a rollback. It never reboots on its own: the update sheet asks you to restart. On the 7 Pro, an attended run of update, reboot into the new kernel, rollback and reboot back all passed.
- **One guided release procedure.** `tools/release` turns the release checklist into stages: kernel, build, images, packages, root image, signed bundle, test install, identifier scan, verify, upload, promote, tag. Each stage has a dry run, checks what the stages before it recorded, and stops at the first problem. The steps that need the maintainer stop and print the exact command.
- **One signed file to download.** A release is now a single `.tar` with everything the installer expects, next to a checksum file and a signature by the release key. Untar it and run `bash install`.
- **A backup of your phone's radio data before you install.** `tools/nv-backup` copies the partitions that hold the phone's radio and calibration data, read-only, and checks every copy against the phone. Its first version sent each partition as one long stream over USB, and on the real phone that failed five times in five runs. It now copies in 8 MiB pieces, checks each one and retries any that come back short, and it completed with every partition verified.
- **Groundwork merged overnight:** release channels and release-key signing, a pinned build toolchain with reproducible kernel builds, release hosting on pkgs.omamobile.org, and an install guide for a release bundle.
- **Already on a development build?** The release notes say what such a phone needs once: the release key's keyring package, installed as a local file before the first update from the release repository.
- **Next, on paper:** a plan for an encrypted disk and a verified boot chain, with a development mode for people who want to tinker.

## Pixel 7 Pro

- **Hyprland 0.57.** Arch Linux ARM moved Hyprland's libraries to new versions and dropped the old ones, so our Hyprland could no longer install. We moved to 0.57 and carried over our fix that keeps retrying when the display refuses to turn on or off. The shell (0.2.79) also needed one setting: on 0.57, its see-through layers drew black on this phone, a black square around the fingerprint ring and a black home screen. Both are fixed and tested on the phone.
- **Media controls** with album art, title, artist, a seek bar and play, pause, next and previous, in the notification shade and on the lock screen.
- **Battery on the lock screen** (Somnius).
- **The voice panel says "Transcribing"** while it turns your speech into text, and Voice settings sets the longest recording.
- **Weather waits for the network after a wake.** It used to try once, the moment the phone woke, before Wi-Fi was back, and give up until the next half hour. Now it retries for up to 75 seconds and keeps showing the last good reading.
- **Files opens folders with one tap** (Somnius), and the file picker no longer waits 25 seconds at login.
- **The power and volume keys ignore the on-screen keyboard,** so their shortcuts work while it's up.
- **Sleep:** the latest sleep test ran 11 suspends with no failures. The power key going dead after a quick double press is fixed; Wi-Fi still takes about 5 seconds to reconnect after each wake, so sleep stays a work in progress for now.
- **Pixel 7 Pros with a BOE screen** get their own display driver, which fixes the garbled picture some of those phones showed after waking (haudamekki).
- **The smoke test knows two harmless log lines** and counts them instead of flagging them, and it now fails outright if the phone's storage stops answering.
- **New screenshots** of the keyboard and voice typing on the README and on omamobile.org.

## Pixel 9a

W4HO-ham's port had a big day:

- **Wi-Fi starts at boot** from the device package. The kernel parts are still in review.
- **GNSS gets a fix,** and a kernel fix keeps one of the chip's clocks on, which ends the resets that killed every GNSS session with the modem up.
- **Charging, the audio processor, speakers and microphones, sensors and NFC start at boot by default.** Fingerprint is opt-in.
- **Sleep moves to testing:** the power key lights the lock screen on the first press, fingerprint works again after a wake, and thirty attended sleeps and a day of real use all woke. Sleep tests stay attended.
- **USB comes back** after a replug the phone didn't notice.

## More

- **Pixel 7** (nesmeck): screen brightness, the battery gauge in the kernel, and a new power test that measures what energy-aware scheduling saves.
- **Pixel 8 Pro** (Somnius): the boot splash stays up until the shell takes over, battery groundwork in the kernel, and battery gauge settings built from Google's public sources.
- **Pixel 6 Pro** (only21mil): an up-to-date sleep plan, plus fixes to the camera data extractor, the power plan and the tests that check boot images in CI.
- **Pixel 6a** (PeterXMR): a first board file is in the kernel. No 6a has booted it yet.
- **Pixel 8a** (aninmucek): first notes and a device descriptor.
- **OnePlus 13** (mrlund): the device notes point at the exact kernel tag in its own fork.
- **Developers** (Nerkyator): the phone preview window on the laptop now fits any screen.

To help, read the [contributor guide](https://github.com/derekross/omarchy-mobile/blob/main/CONTRIBUTING.md), open an issue for your phone, or follow along here.

Omarchy Mobile is a community project built on [Omarchy](https://omarchy.org). It is not an official Omarchy or Basecamp product.
