// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore, collection} from 'firebase/firestore';
import 'firebase/storage';
import 'firebase/firestore';

// //production
// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCzlfpo0Zh_bsQfrllltvRh9dEE9jTiKa4",
//   authDomain: "sklep-62f36.firebaseapp.com",
//   projectId: "sklep-62f36",
//   storageBucket: "sklep-62f36.appspot.com",
//   messagingSenderId: "249402176037",
//   appId: "1:249402176037:web:e3d4e685ec44850f67c5cc"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // firebase.initializeApp(firebaseConfig);

// //initiate storage
// const storage = getStorage(app);

// //initiate database
// const db = getFirestore();

// //refs
// const usersColRef = collection(db, 'users');
// const settingsColRef = collection(db, 'settings');
// const ordersColRef = collection(db, 'orders');

// export { storage, db, usersColRef, settingsColRef, ordersColRef };


//dev
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

//initiate storage
const storage = getStorage(app);

//initiate database
const db = getFirestore();

//refs
const usersColRef = collection(db, 'users');
const settingsColRef = collection(db, 'settings');
const ordersColRef = collection(db, 'orders');

export { storage, db, usersColRef, settingsColRef, ordersColRef };
