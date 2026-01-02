# 📱 Native Mini App – Mini Apps Collection

A collection of small, useful Android apps built using **React Native + Expo**.  
This project is focused on learning **real-world mobile app architecture**, navigation, state management, and offline persistence.

---

## 🚀 Apps Included

### 📝 To-Do App

- **Modern UI**: Clean, card-based design with shadows and soft backgrounds.
- **Task Management**: Add, delete, and toggle completion status for tasks.
- **Visual Feedback**: Strikethrough and checkmark effects for completed tasks.
- **Persistence**: Full offline support using **AsyncStorage** to keep your tasks safe.
- **Interactive**: Haptic feedback and spring animations for a premium feel.
- **Empty State**: Friendly guidance when no tasks are present.

### 🧮 Calculator

- **Full Expression Evaluator**: Supports complex chained operations (e.g., `5 + 2 * 3`).
- **Smart Display**: Clean history vs. main result layout with auto-shrinking text.
- **Advanced Logic**: Handles operator switching, percentages, and division by zero errors.
- **UI Protection**: 15-character input limit to prevent layout overflow.
- **Premium Feel**: Haptic feedback and scale animations on every button press.

### 💸 Expense Tracker

- **Smart Tracking**: Add daily expenses with category selection and date picker.
- **Calculations**: Automatic total expense calculation.
- **Persistence**: **Offline persistence using AsyncStorage**.
- **Reliable**: Data remains after app restart (clears only on uninstall).

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

