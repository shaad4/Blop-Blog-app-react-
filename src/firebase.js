// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAndzWWvVb7PkZDaxbNU714SPl8WNDoEgM",
  authDomain: "blop-19b7f.firebaseapp.com",
  projectId: "blop-19b7f",
  storageBucket: "blop-19b7f.firebasestorage.app",
  messagingSenderId: "313410057177",
  appId: "1:313410057177:web:0905dadc2b4e98faf69fc8",
  measurementId: "G-0BPC8TYD4Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;