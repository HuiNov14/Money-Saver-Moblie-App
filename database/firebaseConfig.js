import * as firebase from 'firebase'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeLrMq25IL3-xNVZ1my6MtoePshQCnyE0",
  authDomain: "moneyapp-217f0.firebaseapp.com",
  projectId: "moneyapp-217f0",
  storageBucket: "moneyapp-217f0.appspot.com",
  messagingSenderId: "744054351501",
  appId: "1:744054351501:web:1ebf3ad12449e69dc824c4",
  measurementId: "G-R4N73Y94KK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

