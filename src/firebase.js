
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from 'firebase/storage'
const firebase = {
     apiKey: "AIzaSyCCXVqWjM_ApwPTFK-n6W2q3NKpe0TwR90",
      authDomain: "hamzeveh.firebaseapp.com",
      projectId: "hamzeveh",
      storageBucket: "hamzeveh.appspot.com",
      messagingSenderId: "616331334951",
      appId: "1:616331334951:web:e022b5bd90521a0e614502"
};

// Initialize Firebase app
const app = initializeApp(firebase);

// Get the authentication instance
export const auth = getAuth(app);
export const storage = getStorage(app)
// Get the Firebase Realtime Database instance
export const database = getFirestore(app);

export default app;