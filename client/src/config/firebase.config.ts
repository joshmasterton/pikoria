import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB2CQOsiMcfcA-ZTRMDBICb4XUjN_954dI",
  authDomain: "pikoria-403d1.firebaseapp.com",
  projectId: "pikoria-403d1",
  storageBucket: "pikoria-403d1.firebasestorage.app",
  messagingSenderId: "121880162313",
  appId: "1:121880162313:web:da039890b628d81a0cc8d8",
  measurementId: "G-C5RTNZYCXC",
};

const app = initializeApp(firebaseConfig);

export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
