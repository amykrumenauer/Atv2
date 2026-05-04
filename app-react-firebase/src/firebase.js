import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2NxstbHegGGGUXHD1jwOmtOHPju-nbkQ",
  authDomain: "atv2-dec88.firebaseapp.com",
  projectId: "atv2-dec88",
  storageBucket: "atv2-dec88.firebasestorage.app",
  messagingSenderId: "178522291544",
  appId: "1:178522291544:web:3fff44321c99d9237d792d",
  measurementId: "G-3G9V12XMCV"
};

// inicializa
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);