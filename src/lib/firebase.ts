import { initializeApp, getApps } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInAnonymously,
  onAuthStateChanged,
  signOut,
  User 
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCTlO36mqxI7z-aAWrEIDBMmflWq-6PKEg",
  authDomain: "timeless-13c21.firebaseapp.com",
  projectId: "timeless-13c21",
  storageBucket: "timeless-13c21.firebasestorage.app",
  messagingSenderId: "453694868322",
  appId: "1:453694868322:android:f2b48a6537320689b63a3b"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);

export { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInAnonymously, 
  onAuthStateChanged, 
  signOut,
  type User 
};
