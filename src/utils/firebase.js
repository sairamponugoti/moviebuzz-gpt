// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBh8mSAKKIWrJ6HilBwzP1lU5aGEexNb_4",
  authDomain: "moviebuff-gpt.firebaseapp.com",
  projectId: "moviebuff-gpt",
  storageBucket: "moviebuff-gpt.appspot.com",
  messagingSenderId: "1018069627903",
  appId: "1:1018069627903:web:9abf8aa6b8a8f64584adca",
  measurementId: "G-9YL79VCKQV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
