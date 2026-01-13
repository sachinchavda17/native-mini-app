# 📱 Native Mini App – Mini Apps Collection

A collection of small, useful Android apps built using **React Native + Expo**.  
This project is focused on learning **real-world mobile app architecture**, navigation, state management, and offline-first data synchronization.

---

## 🆕 New Features (v1.2.0)

### 🔐 Multi-User Authentication

- **Secure Access**: Premium Login and Registration screens.
- **Session Management**: JWT-based authentication with persistent tokens.

### ☁️ Cloud Sync & Offline-First

- **Smart Synchronization**: Adds full sync between Mobile and Backend (FastAPI).
- **Conflict Handling**: Uses `updated_at` timestamps to ensure the latest data is preserved.
- **Network Awareness**: Real-time detection of connectivity changes using `@react-native-community/netinfo`.
- **Background Sync**: Queues local changes while offline and pushes them automatically when the connection is restored.

---

## 🚀 Apps Included

### 📝 To-Do App

- **Modern UI**: Clean, card-based design with shadows and soft backgrounds.
- **Task Management**: Add, delete, and toggle completion status for tasks.
- **Visual Feedback**: Strikethrough and checkmark effects for completed tasks.
- **Persistence**: Full offline support using **AsyncStorage** to keep your tasks safe.
- **Interactive**: Haptic feedback and spring animations for a premium feel.

### 🧮 Calculator

- **Full Expression Evaluator**: Supports complex chained operations (e.g., `5 + 2 * 3`).
- **Smart Display**: Clean history vs. main result layout with auto-shrinking text.
- **Advanced Logic**: Handles operator switching, percentages, and division by zero errors.
- **Premium Feel**: Haptic feedback and scale animations on every button press.

### 💸 Expense Tracker

- **Premium UI**: Modern summary card, category-specific icons, and a floating action button (FAB).
- **Cloud Powered**: Seamlessly syncs your expenses across devices.
- **Smart Tracking**: Add daily expenses with an intuitive category grid selection and date picker.
- **Management**: View recent transactions in a clean list and **delete expenses** with soft-delete sync.
- **Calculations**: Automatic real-time total expense calculation.

---

## 🏗️ Tech Stack

### Frontend (Mobile)

- **React Native** & **Expo**
- **Expo Router** (File-based navigation)
- **Context API** (State orchestration)
- **AsyncStorage** (Local persistence)
- **Reanimated** (Fluid UI transitions)
- **NetInfo** (Network status)

### Backend (Cloud)

- **FastAPI** (Python High-performance Web Framework)
- **MongoDB** (NoSQL Database)
- **JWT** (Secure Authentication tokens)

---

## 📥 Download & Install (Android)

### 🔹 Latest APK

Download the latest Android APK from GitHub Releases:

👉 [Download Latest APK](https://github.com/sachinchavda17/native-mini-app/releases/latest)

---

## ▶️ Run Locally

### 1. Start Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### 2. Start Mobile

```bash
cd mobile
npm install
npx expo start
```

## 📦 Build APK

```bash
eas build -p android --profile preview
```

