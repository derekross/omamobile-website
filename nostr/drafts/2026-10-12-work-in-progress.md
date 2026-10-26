---
{"d": "2026-10-12-work-in-progress", "title": "Omandroid: work-in-progress update", "summary": "Native Omarchy on a Pixel 7 Pro, and what works so far.", "created_at": 1791821556, "source": "e366843bad0edc18fe457c8d4e0dd625a96a596aa17088e400ceb0ab3a3ce493"}
---
Native Omarchy running on a Pixel 7 Pro: Arch Linux ARM, Hyprland and Omarchy's own packages, on a mainline Linux kernel. No Android underneath.

## Hardware working
- Boots our own mainline kernel (7.3-rc) from the second boot slot, with stock Android kept on the other slot
- Display (1440×3120 OLED) with brightness control
- GPU: Mali-G710 with OpenGL ES 3.1 and Vulkan 1.4 through Mesa (we added the G710 to Mesa's Panfrost driver), Hyprland renders on it, and the GPU now scales its clock with load
- Wi-Fi: connects at boot and reconnects to saved networks, ~150 Mbit/s
- Bluetooth: pairing and audio, with the first sound from the phone playing through Pixel Buds Pro
- Vibration for system feedback
- Flashlight
- Charging under Linux control (in testing), past the bootloader's 93% cutoff
- Touchscreen with multi-touch
- Power and volume buttons
- Battery level in the status bar
- Internal storage, with the system partitions locked read-only
- USB networking and SSH

## Software working
- Omarchy themes, the menu, the notification shade and the Omarchy boot animation
- Android-style Wi-Fi and Bluetooth menus: pick a network and type its password, pair and connect devices
- Flashlight toggle in quick settings
- A phone-style home screen and launcher with app search and "ask your agent"
- On-screen keyboard
- App switcher: swipe up, tap to switch, flick to close
- Lock screen with a PIN pad: locks after boot and after the screensaver
- Power + volume down takes a screenshot
- Apps open full screen, like on Android
- Kernel updates installed from inside Linux

Next up: speakers and mics (they run through Google's audio processor), suspend, 120 Hz, then camera, cellular, GPS and Android apps through Waydroid.

Video later :)
