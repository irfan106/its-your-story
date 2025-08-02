import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDwpUekvnYsr5qdj2BZPQs_teuukcKoV50",
  authDomain: "its-your-story.firebaseapp.com",
  projectId: "its-your-story",
  storageBucket: "its-your-story.appspot.com",
  messagingSenderId: "905651157300",
  appId: "1:905651157300:web:10d9d77f6a6a65874f8d61",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage, googleProvider };
