import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpPLVIayQH6q8tFUC3YUSvhKuhZckCtKg",
  authDomain: "voice-notes-4bec3.firebaseapp.com",
  projectId: "voice-notes-4bec3",
  storageBucket: "voice-notes-4bec3.appspot.com",
  messagingSenderId: "837751634692",
  appId: "1:837751634692:web:3e80edfe3c2d3effd0ee51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const database = getDatabase(app);
export const auth = getAuth(app);
