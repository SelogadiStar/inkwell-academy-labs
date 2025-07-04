import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBGivTGc2vSfKMlJXOnfBSmp_zwVu1qhyI",
  authDomain: import.meta.env.VITE_FIREBASE_PROJECT_ID ? `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com` : "inkwell-academy-33a07.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "inkwell-academy-33a07",
  storageBucket: import.meta.env.VITE_FIREBASE_PROJECT_ID ? `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.appspot.com` : "inkwell-academy-33a07.appspot.com",
  messagingSenderId: "840969506933",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:840969506933:web:8b7f615abb94067544283c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);