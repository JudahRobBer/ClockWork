import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyC--50GVPpPeOvphEwp7OK7G8ikvThcdyU",
  authDomain: "agenda-b8388.firebaseapp.com",
  projectId: "agenda-b8388",
  storageBucket: "agenda-b8388.appspot.com",
  messagingSenderId: "452291660445",
  appId: "1:452291660445:web:041ba96865f0fd91f1e274",
};

export const FIREBASE_APP = initializeApp(firebaseConfig)
export const FIRESTORE_DB = getFirestore(FIREBASE_APP)
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)

