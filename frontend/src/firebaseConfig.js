// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAsDL_mbZfdObHL_qLj9Z0p30sY6sv_yJs",
  authDomain: "doraemon-dbbf0.firebaseapp.com",
  databaseURL: "https://doraemon-dbbf0-default-rtdb.firebaseio.com",
  projectId: "doraemon-dbbf0",
  storageBucket: "doraemon-dbbf0.appspot.com",
  messagingSenderId: "1026829781643",
  appId: "1:1026829781643:web:d8e6f1c60a60954b3a228e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Service
const db = getFirestore(app);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, db, auth, database };
