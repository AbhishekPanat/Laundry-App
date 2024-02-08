// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBATV8lIXKtaOoa2a4_eHhVImpv1sPfLd8",
  authDomain: "laundry-appliaction.firebaseapp.com",
  projectId: "laundry-appliaction",
  storageBucket: "laundry-appliaction.appspot.com",
  messagingSenderId: "318846504397",
  appId: "1:318846504397:web:9c217617bc40e693180884"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth1 = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

const auth  = getAuth(app);

const db = getFirestore();

export {auth1, auth, db};