---
{"d": "2026-10-24-weekly-update", "title": "Omarchy Mobile: this week's update", "summary": "A big week, more than half of it from the community: new Pixel ports moving forward, and the Pixel 7 Pro getting more polished.", "created_at": 1792868884, "source": "c6a30d74b96a79cd9973a37a6300063d20a4edf517977923918223d984280874"}
---
It was a big week, and more than half of it came from the community. Ports to new Pixels moved forward, a lot of hardware support landed, and the daily-driver experience on the Pixel 7 Pro got more polished.

## New devices

- Pixel Fold (felix): went from first light to a real bring-up. Storage behind our read-only safety guard, the GPU enabled, volume keys, the power key, the hinge sensor and the cover screen's console. Work has started on its cover touchscreen. Thanks, boozedog!
- Pixel 8 Pro (husky, Tensor G3): our mainline kernel boots it with USB and SSH. Getting there turned up and fixed a USB bug that froze the phone, and that fix can go upstream to Linux too. Thanks, greenbrettmichael!
- Pixel 9a (tegu, Tensor G4): first light is recorded. More than a dozen kernel pieces for Tensor G4 merged, covering clocks, storage, pins, power management, GPU and touch, and a read-only battery gauge is in review. Thanks, W4HO-ham!
- Pixel 7a (lynx): new this week! A first-light board and an on-screen console are in review. Thanks, latentoperator!
- Pixel 6 (gs101): the build and flash tooling, bootloader glue and Mali-G78 GPU support merged. Thanks, robotosaith and bilacc!
- Also in progress: the Pixel 4 and the POCO F3, our first non-Pixel port.

## Pixel 7 Pro, the reference phone

- Camera: Night mode and HDR in omacam. Several raw frames are aligned and merged on the phone, and libcamera gained noise reduction and defective-pixel correction.
- Calls: groundwork for phone calls, with calls over the lock screen, a call indicator, Do Not Disturb that lets starred contacts through, and an Emergency call button on the lock screen.
- Notifications: you can reply straight from the notification.
- Charging: the charger and its battery-temperature guard now start at boot.
- Suspend: Wi-Fi stays connected across sleep and we've measured the first sleep power numbers.
- Fingerprint: unlock keeps working across sleep.
- Updates: Omarchy updates now follow Omarchy's stable channel on the phone, and our phone patches are reapplied automatically after each update.
- Kernel cleanup: the Tensor G2 watchdog and power-management hardware is now documented to upstream standards, and the result booted on the phone this week.
## For contributors
- Every pull request now runs automatic checks in both repositories, kernel included.
- There's a one-command phone smoke test for PR reports.
- Shared install tooling handles new devices, and the installer refuses images built for another device.
- We reviewed more than 20 pull requests this week, and our review notes and lessons are public.
## Get involved
Have a spare Pixel 6, 7, 8 or 9? Check the supported-devices page and the Wanted list in the repo, and open an issue so efforts don't overlap. Have another phone or tablet with an unlocked bootloader? Point your agents to the repo and have them get to work!

https://github.com/derekross/omarchy-mobile
