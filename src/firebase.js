import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDU8ba_fzj7y-g29flMEZFF7mpaVDZOFj0",
  authDomain: "whats-app-clone-342c8.firebaseapp.com",
  databaseURL: "https://whats-app-clone-342c8.firebaseio.com",
  projectId: "whats-app-clone-342c8",
  storageBucket: "whats-app-clone-342c8.appspot.com",
  messagingSenderId: "747796452708",
  appId: "1:747796452708:web:bdd37a6b51ed60561c9671",
  measurementId: "G-SCYEWCJTWM"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;