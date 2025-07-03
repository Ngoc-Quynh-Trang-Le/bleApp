# 📱 BLE-to-Web Cultural Storytelling App  

**Da Nang Museum of Cham Sculpture**  
COS10025 – Smart Environments Project

---

## ✅ App Overview

This mobile app helps museum visitors experience the stories of Cham artifacts in a respectful, hands-free way. As a visitor walks near an artifact, the app quietly listens for a small BLE (Bluetooth Low Energy) signal coming from an ESP32 beacon hidden near the display.

When the app detects **only one artifact** is nearby, the app **automatically opens a webpage** that tells the story of that artifact, using the phone’s normal browser. This means the visitor doesn’t have to tap, pair, scan anything, or interact with their phone — it just works automatically.

If the visitor happens to be standing in the overlapping proximity of **more than one artifact**, the app will gently show a **clean, one-tap list of artifact names** on the screen for the visitor to choose which story they’d like to explore.

This system was designed to be:

* 👐 **Hands-free and easy** – no setup or Bluetooth pairing needed
* 🧍‍♀️ **Respectful** – works silently without disturbing sacred spaces
* 🌐 **Accessible to everyone** – tourists, students, and elders can use it easily
* 🛡️ **Culturally appropriate** – lets visitors explore stories quietly and at their own pace, without distractions

Visitors don’t need to install anything extra or understand technology. They simply carry their phone as they explore — the app takes care of the rest.

---

## 🧩 Features

- 🗸 **Passive BLE Scanning** (non-connectable beacons; no pairing required)
- 🗸 **Automatic Story Launch** when one artifact is nearby
- 🗸 **Minimal Selection UI** when multiple artifacts are detected
- 🗸 **Cooldown Timer** to prevent spamming or repeated auto-launches
- 🗸 **Culturally respectful**, contactless, no-tap browsing experience
- 🗸 **Hosted content** accessible via public URLs (e.g., on Mercury server)

---

## 🏗️ Full React Native App Structure

```plaintext
COS10025_BLEtoWebSystem/
ble-to-web-app/
│
├── android/                    # Android native config
├── ios/                        # iOS native config
├── src/                        # All source code
│   ├── components/             # UI components (ListView, Modal, etc.)
│   │   └── BeaconList.tsx      # Artifact selector when multiple beacons detected
│   │
│   ├── logic/                  # Business logic
│   │   ├── bleManager.ts       # BLE scanning logic using react-native-ble-plx
│   │   ├── cooldownManager.ts  # Cooldown time handling for beacons
│   │   └── beaconMap.ts        # Dictionary mapping beacon names → URLs
│   │
│   ├── screens/                # App views
│   │   └── HomeScreen.tsx      # Main scanning and decision interface
│   │
│   ├── App.tsx                 # Root component (entry point)
│   └── types.ts                # Type declarations (e.g., BeaconInfo type)
│
├── package.json                # Project metadata & dependencies
├── tsconfig.json               # TypeScript config (recommended)
└── README.md                   # Project documentation
```

---

## 📦 Dependencies

The app uses native BLE libraries and must be built with **React Native CLI** (not Expo Go).

### Required Packages

```bash
npm install react-native react-native-cli
npm install react-native-ble-plx react-native-permissions
npx pod-install  # For iOS
```

### Optional (UI Framework, if used)

```bash
npm install react-native-paper
```

---

## 🛠️ Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Ngoc-Quynh-Trang-Le/COS10025_BLEtoWebSystem.git
```

### 2. Install Dependencies

```bash
cd COS10025_BLEtoWebSystem/bleToWebApp
npm install
```

## ▶️ Running on Android (USB)

### 1. Connect Your Android Phone

- Enable **Developer Options** + **USB Debugging** by tapping Build Number 7 times
- Connect your phone via USB cable
- Run: `adb devices` to verify connection

### 2. Start the App

```bash
cd COS10025_BLEtoWebSystem/bleToWebApp
npx react-native run-android
```

### 3. Troubleshooting

If you encounter issues while running the app, consider the following steps:

1. **Check Dependencies**: Ensure all required packages are installed and up-to-date.
2. **Clear Cache**: Sometimes, clearing the cache can resolve unexpected behavior:
   ```bash
   cd COS10025_BLEtoWebSystem/bleToWebApp
   npx react-native start --reset-cache
   ```
3. **Rebuild the App**: If you make changes to native code or dependencies, you may need to clean and rebuild the app:
   ```bash
   cd COS10025_BLEtoWebSystem/bleToWebApp
   cd android && ./gradlew clean && cd ..
   npx react-native run-android
   ```
4. **AndroidManifest.xml Issues**: If you get manifest parsing errors, run with verbose logging:
   ```bash
   npx react-native run-android --verbose
   # Or check the specific manifest processing:
   cd android && ./gradlew app:processDebugMainManifest --stacktrace --info
   ```
5. **BLE Permissions**: Ensure your AndroidManifest.xml includes all required BLE permissions for scanning and location access.

---

## ▶️ Running on iOS (Simulator or Device)

### 1. Connect Your iOS Device

- Enable **Developer Mode** on your iOS device
- Connect your device via USB cable
- Open Xcode and select your device from the device list

### 2. Start the App

```bash
cd COS10025_BLEtoWebSystem/bleToWebApp
npx pod-install ios  # Install iOS dependencies
npx react-native run-ios
```

---

## 🧭 Usage Flow

ESP32 BLE Beacons → Broadcast non-connectable name (e.g., Tara_Bodhisattva_Statue)

↓ Passive scan

React Native App:
  ├── Scan for nearby advertisements
  ├── Match against beacon-to-URL dictionary
  ├── If 1 match: Auto-open URL after 2s delay via `urlLauncher.ts`
  └── If >1 match: Show a clean, one-tap list of artifact names using `BeaconList` to let user choose

→ Launch correct webpage in mobile browser after 30s cooldown period to prevent spam reopening

## 🌐 Artifact Content Hosting

All Cham cultural artifact webpages must be:

- Hosted online via `https://` (no localhost or internal IP)
- Optimized for mobile display (HTML/CSS/JS only)
- Accessible via the university’s Mercury server
  Example:

  ```markdown
  Artifact: Tra Kieu Apsara Relief
  https://mercury.swin.edu.au/cos10025/project-groupX/TraKieu_Apsara_Relief.html
  ```

Update the mapping dictionary in `beaconMap.ts`:

```ts
export const beaconToUrl: Record<string, string> = {
  "TraKieu_Apsara_Relief": "https://mercury.swin.edu.au/.../TraKieu_Apsara_Relief.html",
  "Tara_Bodhisattva_Statue": "https://mercury.swin.edu.au/.../Tara_Bodhisattva_Statue.html"
};
```

---

## 📱 Minimum Requirements for Mobile Phone

### Android

| Feature           | Value                          |
| ----------------- | ------------------------------ |
| Android Version   | 6.0+ (API 23 or above)         |
| Bluetooth Version | BLE-compatible (4.0+)          |
| Internet Access   | Required for storytelling URLs |

---

### iPhone

| Feature           | Value                          |
| ----------------- | ------------------------------ |
| iOS Version       | 12.0+                          |
| Bluetooth Version | BLE-compatible (4.0+)          |
| Internet Access   | Required for storytelling URLs |

---

## 📱 Permissions

- **Android**: Requires `BLUETOOTH_SCAN`, `BLUETOOTH_CONNECT`, and `ACCESS_FINE_LOCATION` permissions for BLE scanning.
- **iOS**: Requires `NSBluetoothAlwaysUsageDescription` and `NSBluetoothPeripheralUsageDescription` in `Info.plist` for BLE access.
- **External Browser**: Uses the device's default browser to open URLs, requiring no additional permissions.

---

## 🎨 Cultural Design Notes

- No physical interaction required
- UI texts are culturally respectful
- Artifact names are displayed with formatting (e.g., `Tara_Bodhisattva_Statue` → `Tara Bodhisattva Statue`)
- Fallback UI is optional, minimal, and only shown when essential

---
