import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore, collection } from 'firebase/firestore';

// dev
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// firebase.initializeApp(firebaseConfig);

// initiate storage
const storage = getStorage(app);

// initiate database
const db = getFirestore();

// refs
const usersColRef = collection(db, 'users');
const settingsColRef = collection(db, 'settings');
const ordersColRef = collection(db, 'orders');

export {
  storage, db, usersColRef, settingsColRef, ordersColRef,
};
