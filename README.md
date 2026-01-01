# 📱 Native Mini App – Mini Apps Collection

A collection of small, useful Android apps built using **React Native + Expo**.  
This project is focused on learning **real-world mobile app architecture**, navigation, state management, and offline persistence.

---

## 🚀 Apps Included

### 📝 To-Do App
- Add and manage daily tasks
- Simple and clean UI
- Works offline

### 🧮 Calculator
- Basic arithmetic operations
- Responsive button layout
- Fast and lightweight

### 💸 Expense Tracker
- Add daily expenses
- Category selection
- Date picker
- Total expense calculation
- **Offline persistence using AsyncStorage**
- Data remains after app restart (clears only on uninstall)

---

## 📥 Download & Install (Android)

### 🔹 Latest APK
Download the latest Android APK from GitHub Releases:

👉 [Download Latest APK](https://github.com/sachinchavda17/native-mini-app/releases/latest)

---

### 📲 Installation Steps

1. Download the APK from the link above
2. Open the APK file on your Android device
3. Enable **“Install unknown apps”** when prompted
4. Install and open the app

---

## 🧠 Architecture Highlights

- Expo Router for file-based navigation
- Feature-scoped layouts
- Context API for state management
- AsyncStorage for offline persistence

## 📁 Project Structure
```bash
app/
├─ index.tsx              # App launcher (Home)
├─ todo/                  # Todo mini app
├─ calculator/            # Calculator mini app
├─ expense/               # Expense tracker
├─ context/               # Context providers (Expense, etc.)
└─ constants/             # App-wide constants
```

---

## 🛠️ Tech Stack

- React Native
- Expo
- Expo Router
- AsyncStorage
- Context API
- Expo Vector Icons

---

## ▶️ Run Locally

```bash
npx expo start
```

## 📦 Build APK
```bash
eas build -p android --profile preview
```
