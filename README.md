# ✨ It's Your Story

> **"Because every voice matters."**  
A modern, elegant blog platform where users can create, share, and explore compelling stories from across the world.

---

## 📸 Live Demo

🚧 Coming Soon...  
<!-- Replace with deployed URL when available -->
<!-- Example: https://itsyourstory.web.app -->

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ React (with Hooks & Router)
- 🎨 Material UI (MUI) for modern UI components
- 🔥 Firebase Auth for user login
- 📦 Apollo Client (GraphQL client)
- 🌗 Dark Mode support
- 📱 Fully responsive design

### Backend
- 🔥 Firebase Firestore (NoSQL DB)
- ⚙️ Firebase Functions (backend logic)
- 🌐 Apollo Server (GraphQL API)
- ☁️ Firebase Storage for image hosting

---

## 🔥 Features

- ✍️ Create, edit, and delete blog posts
- 📈 View counter for tracking popularity
- 🚀 Trending and Most Popular sections
- 🔎 Tag-based filtering
- 🖼️ Random featured image fallback for blogs
- 🔐 Firebase Authentication
- 💡 Light & dark mode toggle
- 🧠 Clean architecture with reusable components and hooks

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/its-your-story.git
cd its-your-story
```

### 2. Install dependencies

#### Frontend

```bash
cd frontend
npm install
```

#### Backend (Firebase Functions)

```bash
cd backend/functions
npm install
```

### 3. Firebase Setup

1. Create a Firebase project from [Firebase Console](https://console.firebase.google.com)
2. Enable:
   - Firestore Database
   - Firebase Authentication (email/password)
   - Firebase Storage
3. Add your Firebase config to `frontend/firebase.js`:

```js
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
};
```

---

## 🧪 Scripts

### Frontend

```bash
npm start       # Run development server
npm run build   # Build for production
```

### Backend

```bash
firebase deploy # Deploy backend functions
```

---

## ✅ TODOs

- 🔎 Full-text blog search  
- 💬 Commenting system  
- 📱 PWA support  
- 🧠 AI-based blog suggestions  
- 📬 Email notifications for trending posts  
- 🏷️ Blog categories  
