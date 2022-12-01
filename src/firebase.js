// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// REPLACE WITH YOUR FIREBASE PROJECT CREDNETIALS HERE!
const firebaseConfig = {
	apiKey: "AIzaSyBPbfVpHHRf1vBop8JypZrwo4giIFl_XA8",
	authDomain: "groupasm-55c85.firebaseapp.com",
	projectId: "groupasm-55c85",
	storageBucket: "groupasm-55c85.appspot.com",
	messagingSenderId: "472845097706",
	appId: "1:472845097706:web:8f7b5518036c0cb0eb5593",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
