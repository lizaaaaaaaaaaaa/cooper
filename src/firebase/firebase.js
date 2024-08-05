import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDJrRHbg_Dl8AUrNR40SNTDOG1OqwS2MYs",
  authDomain: "cooper-3c826.firebaseapp.com",
  databaseURL: "https://cooper-3c826-default-rtdb.firebaseio.com",
  projectId: "cooper-3c826",
  storageBucket: "cooper-3c826.appspot.com",
  messagingSenderId: "321609573891",
  appId: "1:321609573891:web:626b7ff7c187871b78d036"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getDatabase(app);

export { storage, db };
