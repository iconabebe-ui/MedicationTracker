import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSy....",
  authDomain: "medicationreminder.firebaseapp.com",
  projectId: "medicationreminder",
  storageBucket: "medicationreminder.appspot.com",
  messagingSenderId: "123456",
  appId: "1:123456:web:abcd"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
