// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzY4K44vBeY7rlo_PC8cN1SyHwSMM8vz8",
  authDomain: "project-management-app-39491.firebaseapp.com",
  projectId: "project-management-app-39491",
  storageBucket: "project-management-app-39491.firebasestorage.app",
  messagingSenderId: "318570250811",
  appId: "1:318570250811:web:f4c6db5e8824bda83ed21e",
  measurementId: "G-0XZCBG85K8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };