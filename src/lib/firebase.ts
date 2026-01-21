// @ts-ignore
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC8rJ8KHxZjP8KD5V5L3M2N1O0P9Q8R7S6T",
  authDomain: "prince-66863.firebaseapp.com",
  projectId: "prince-66863",
  storageBucket: "prince-66863.firebasestorage.app",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef"
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
