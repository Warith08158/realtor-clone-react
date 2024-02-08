// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCT4Qce3k2Yo8MktlbjA5-08yugyPGzLpE",
  authDomain: "realtor-clone-react-8a156.firebaseapp.com",
  projectId: "realtor-clone-react-8a156",
  storageBucket: "realtor-clone-react-8a156.appspot.com",
  messagingSenderId: "376338392680",
  appId: "1:376338392680:web:a351c9f6c805839f813ddd"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();