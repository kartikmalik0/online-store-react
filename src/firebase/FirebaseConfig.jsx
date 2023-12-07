// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDGanb2IFe7moLOdILPT_Xz5hdsXKT2nbg",
  authDomain: "mystore-f9796.firebaseapp.com",
  projectId: "mystore-f9796",
  storageBucket: "mystore-f9796.appspot.com",
  messagingSenderId: "68080948433",
  appId: "1:68080948433:web:bdc326efff9161d47a21f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app)
const auth = getAuth(app)

export {fireDB, auth}