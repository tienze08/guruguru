// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsf3No6YQnjJVwXG1QPliAnJwHYYgL5LE",
  authDomain: "coursera-b6a2e.firebaseapp.com",
  projectId: "coursera-b6a2e",
  storageBucket: "coursera-b6a2e.firebasestorage.app",
  messagingSenderId: "672555395558",
  appId: "1:672555395558:web:b69d4cfce3d1dad75d0e27",
  measurementId: "G-0M3DF3JCQL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
const analytics = getAnalytics(app);