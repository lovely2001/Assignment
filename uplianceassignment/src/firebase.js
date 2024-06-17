import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyALs_ud7MAOf39XoP8U6LOSRHM-IQTHKWU",
  authDomain: "form-assignment-70397.firebaseapp.com",
  databaseURL: "https://form-assignment-70397-default-rtdb.firebaseio.com",
  projectId: "form-assignment-70397",
  storageBucket: "form-assignment-70397.appspot.com",
  messagingSenderId: "950220057254",
  appId: "1:950220057254:web:262c61d63bf74efea5e267",
  measurementId: "G-C8XZQS9195"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, createUserWithEmailAndPassword, db, signInWithEmailAndPassword  };
