// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmlJg2Fw8Br7dfNOyOflMgF7W3fl8TNL4",
  authDomain: "miniblog-1f71c.firebaseapp.com",
  projectId: "miniblog-1f71c",
  storageBucket: "miniblog-1f71c.appspot.com",
  messagingSenderId: "960811423278",
  appId: "1:960811423278:web:950eae221837023b9ff1bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db};