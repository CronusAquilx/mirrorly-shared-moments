# Mirrorly

**Remote control for iPhone (sideloaded) + Web Viewer**

Mirrorly lets you view and control an iPhone from any browser after installing a small sideloaded agent on the phone.

---

## Project Structure

```
mirrorly/
├── ios-agent/          → Swift iOS app (the agent you sideload)
├── web/                → Modern web viewer + controller
├── backend/            → Signaling + WebRTC server
├── docs/               → Setup & build instructions
└── README.md
```

---

## Current Status

This is the foundation of the full system.

### What works in this version
- Clean project structure
- Web viewer UI (ready for WebRTC stream)
- Basic backend signaling server
- iOS agent skeleton (screen capture + control channel ready to expand)

### What still needs work
- Full touch injection on iOS (hardest part)
- Stable WebRTC connection between agent and browser
- Pairing / room code system
- Building and signing the IPA

---

## Requirements

### To build the iOS Agent
- Mac with Xcode (recommended)
- Apple ID (free or paid developer account)
- Sideloading tool (Sideloadly, AltStore, or similar)

### To run the web part
- Node.js 18+

---

## Quick Start (Development)

### 1. Backend
```bash
cd backend
npm install
npm start
```

### 2. Web Viewer
Open `web/index.html` or serve the `web` folder.

### 3. iOS Agent
Open `ios-agent` in Xcode, configure signing, build, and sideload.

---

## Important Reality Check

Full system-wide control of a non-jailbroken iPhone is extremely restricted by Apple, even with sideloading.  
We are building the best possible version using available techniques (ReplayKit + control channel + WebDriverAgent-style approaches where possible).

---

More detailed instructions are in the `/docs` folder.
