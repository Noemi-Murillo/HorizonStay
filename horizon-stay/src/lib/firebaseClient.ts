import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAx6A0-jah5xGDHBjIQ89HbblX9BqqObek",
  authDomain: "horizon-stay.firebaseapp.com",
  databaseURL: "https://horizon-stay-default-rtdb.firebaseio.com",
  projectId: "horizon-stay",
  storageBucket: "horizon-stay.firebasestorage.app",
  messagingSenderId: "12728872855",
  appId: "1:12728872855:web:a72e8b3dd644493d58ded2",
  measurementId: "G-RP6ESJKQDM"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export {database};
