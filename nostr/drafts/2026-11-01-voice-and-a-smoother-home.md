---
kind: 30023
d: 2026-11-01-voice-and-a-smoother-home
title: "Omarchy Mobile: voice input everywhere, a smoother home screen, and a faster Pixel 7 Pro"
summary: "Speak instead of typing in any app, or straight to your coding agent, all on the phone; the home screen and app drawer follow your finger; the keyboard takes your Omarchy theme; the Pixel 7 Pro scales its CPU; and the Pixel 8 Pro and 9a move again."
t: [omarchy, omarchymobile, linux, mobilelinux, arch, hyprland, pixel]
status: published 2026-11-01 (nostr/events/2026-11-01-voice-and-a-smoother-home.json)
---

A big day on the Pixel 7 Pro. You can now talk to your phone anywhere in the system, the home screen and app drawer move with your finger, and the phone got faster. Here's what changed since yesterday's post.

## Voice, everywhere

Voice input is now part of the phone, not a separate app. Speech is turned into text on the phone itself with Whisper, through Omarchy's Voxtype. Nothing is sent anywhere.

- **One voice bar for everything.** It opens above the keyboard. A chip at the top says where your words go:
  - **Type here** in the app you're using;
  - **Send** to the coding agent on screen;
  - **Ask Claude Code** with a new prompt;
  - **Copy** to the clipboard;
  - **Search apps** in the launcher.
- **Start it the way you like:**
  - hold the home pill at the bottom of the screen;
  - tap Mic on the keyboard;
  - hold the search bar on the home screen;
  - the Voice tile in Quick Settings (its arrow opens voice settings);
  - Power + Volume Up as push-to-talk, if you turn it on.
- **Words appear while you speak.** A quick draft shows in the bar as you talk, and the final text replaces it when you tap Done.
- **A check before the agent acts.** Coding agents on the phone run with full permissions, so a new prompt shows your words and a warning first, with Discard, Again and Ask. You can turn the check off in settings.
- **Faster.** Better speech model settings and the new CPU scaling (below) cut the wait after you stop talking. Twelve seconds of speech now takes about two seconds to turn into text.
- **Next:** voice on the lock screen is designed but not built. Speech can be turned into text while the phone is locked, but nothing acts on it until you unlock.

## The keyboard

- **It takes your Omarchy theme,** and changes with it.
- **A new action row** on top in every language: Mic, Paste (opens the clipboard), Emoji and Hide.
- **Double-tap the home pill** to show or hide the keyboard.
- **A language picker** for the keyboard's globe key, sized for fingers, is built and goes on the phone next.

## The home screen and app drawer

- **Everything follows your finger.** Swipe up anywhere on the home screens and the app drawer rises with you; swipe down, or drag its pill, to close it. Home pages slide 1:1 under your finger and settle in a quarter of a second, and the home screen dims under your theme as the drawer comes up. The stutters, jumps and freezes in the old drawer are gone.
- **Sharper icons.** Apps that only ship small bitmap icons, such as Chromium, now use their largest size and look crisp.
- **An Updates entry in the app drawer** opens the update sheet, with fixes from the first full 81-package update on the phone. No more "Launching…" toast left on top of shell sheets.
- **Lighter widgets** (Gr-linkk): home widgets read a bounded amount of output and stop their work when they're hidden.
- **No keyboard flash** when the drawer closes after a search.

## Pixel 7 Pro

- **CPU frequency scaling is in the published kernel.** The phone now picks the speed it needs, with thermal zones to keep it cool. A three-minute load on every core settles at 78-80 °C, battery tests at full load passed, and Whisper runs about twice as fast.
- **The GPU slows down when it gets hot,** to 572 MHz at 80 °C and 302 MHz at 90 °C, on a test kernel.
- **Louder speakers,** under the speakers' own protection firmware, which now measures the coils while playing. Three and a half minutes of loud music kept both coils at 60-65 °C, well under the 80 °C safety limit.
- **An earpiece mode** for calls, with its own audio profile.

## Pixel 8 Pro

- **Touch is in the published kernel** (greenbrettmichael).
- **The GPU can scale up to 890 MHz** (greenbrettmichael).
- **Wi-Fi firmware** can now be pulled from your own factory image with our extractor (greenbrettmichael).
- Battery, display, CPU and GPU work from Somnius and greenbrettmichael is in review.

## Pixel 9a

- **NFC and the audio processor start at boot,** the charge limit uses the kernel's charger driver, and the 9a has its own first-boot setup (W4HO-ham).
- **Notes from a second 9a** and the kernel settings it boots with (h4rkl).
- Kernel work for Wi-Fi, the modem, cameras and fingerprint is in review.

## More

- **Pixel 7** (nesmeck): the touchscreen's settings now match stock, and the battery's I2C bus is enabled.
- **OnePlus 13** (mrlund): safer installs that refuse the wrong boot path.
- **Safer releases** (h4rkl): signed boot images never carry the builder's SSH keys, and first boot sets a sane clock before it makes keys.

To help, read the [contributor guide](https://github.com/derekross/omarchy-mobile/blob/main/CONTRIBUTING.md), open an issue for your phone, or follow along here.

Omarchy Mobile is a community project built on [Omarchy](https://omarchy.org). It is not an official Omarchy or Basecamp product.
