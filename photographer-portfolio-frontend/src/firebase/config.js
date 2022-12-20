import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore, collection } from 'firebase/firestore';

// dev
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC6k9fNi8-usqWG_AeRMLBpErWhc45jo9o',
  authDomain: 'kacper-foto.firebaseapp.com',
  projectId: 'kacper-foto',
  storageBucket: 'kacper-foto.appspot.com',
  messagingSenderId: '950070737414',
  appId: '1:950070737414:web:232fc51cb42460e45fa187',
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
