// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";

// import firebase from 'firebase';
import 'firebase/storage';
import 'firebase/firestore';

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

const storage = getStorage(app);
// const projectStorage = firebase.storage();
// const projectFirestore = firebase.firestore();

export { storage
  // , projectFirestore
};
