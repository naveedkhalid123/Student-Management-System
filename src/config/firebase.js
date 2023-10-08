// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// contact page cloud firestore

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {



    apiKey: "AIzaSyCrPDEecWvp3kRkBn0eWBnWfZEPOw387gQ",
    authDomain: "studentmanagmentsystem-6eae3.firebaseapp.com",
    projectId: "studentmanagmentsystem-6eae3",
    storageBucket: "studentmanagmentsystem-6eae3.appspot.com",
    messagingSenderId: "734396430633",
    appId: "1:734396430633:web:51b9c18315085c817f1f38",
    measurementId: "G-Y9LEKFTB45"


};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
const auth = getAuth(app);

// firestore database

const firebase = getFirestore(app)
// we copy this from storge 
const storage = getStorage(app);

// and we are exporting here things
export {auth , firebase , storage}