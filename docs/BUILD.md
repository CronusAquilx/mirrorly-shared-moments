# How to Build & Sideload Mirrorly

## 1. Backend + Web (test on any computer)

```bash
cd backend
npm install
npm start
```

Then open http://localhost:3000 in your browser.

## 2. iOS Agent

### Requirements
- Mac with Xcode installed
- Free or paid Apple Developer account
- iPhone with Developer Mode enabled

### Steps
1. Create a new iOS App project in Xcode
2. Copy the Swift files from `ios-agent/MirrorlyAgent/`
3. Set your own Bundle Identifier
4. Select your Team for signing
5. Connect your iPhone and run the app (or Archive → Export IPA)

### Sideloading options
- **Sideloadly** (Windows/Mac) – easiest for most people
- **AltStore**
- **TrollStore** (if your iOS version supports it)
- Xcode direct install

## 3. Next Development Steps

- Implement real WebRTC in both web and iOS agent
- Add ReplayKit screen capture
- Research and implement best-effort touch injection
- Add pairing security (one-time codes, optional password)
