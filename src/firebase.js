import firebase from "firebase";

const firbaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCkNz8ZCx--yQNsw8-iQTjkJ_9sFXQkhqA",
  authDomain: "instagram-clone-a6db5.firebaseapp.com",
  projectId: "instagram-clone-a6db5",
  storageBucket: "instagram-clone-a6db5.appspot.com",
  messagingSenderId: "897971248527",
  appId: "1:897971248527:web:8451f736facabd6881fffa",
  measurementId: "G-LPZVQEB61C",
});

const db = firbaseApp.firestore();
const auth = firbaseApp.auth();
const storage = firbaseApp.storage();

export { db, auth, storage };
