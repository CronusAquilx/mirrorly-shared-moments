# Mirrorly iOS Agent

This is the sideloaded app that runs on the iPhone.

## What it does
- Captures the screen (ReplayKit)
- Connects to the Mirrorly backend
- Receives control commands (tap, swipe, etc.)
- Injects touches back into the system (best-effort on non-jailbroken iOS)

## How to build

1. Open this folder in Xcode on a Mac
2. Change the Bundle Identifier to something unique
3. Select your Apple ID / Team for signing
4. Build and install on your iPhone (or export IPA and sideload)

## Important Notes

Full system-wide touch injection is restricted by Apple even for sideloaded apps.  
We use the best available methods (including research into IOHIDEvent and Accessibility techniques). Results will vary by iOS version.

## Current Status

Skeleton only – screen capture and networking structure is prepared.  
Control injection is the next major piece of work.
