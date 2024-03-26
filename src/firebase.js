// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDd8kcIPu66PW6D4rY77A0YwoQuSAxi5rU",
  authDomain: "order-app-2c1b0.firebaseapp.com",
  databaseURL: "https://order-app-2c1b0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "order-app-2c1b0",
  storageBucket: "order-app-2c1b0.appspot.com",
  messagingSenderId: "189823686963",
  appId: "1:189823686963:web:12d18e088af9d78afcc646"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

