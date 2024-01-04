import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDeLrMq25IL3-xNVZ1my6MtoePshQCnyE0",
    authDomain: "moneyapp-217f0.firebaseapp.com",
    projectId: "moneyapp-217f0",
    storageBucket: "moneyapp-217f0.appspot.com",
    messagingSenderId: "744054351501",
    appId: "1:744054351501:web:1ebf3ad12449e69dc824c4",
    measurementId: "G-R4N73Y94KK"
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);



