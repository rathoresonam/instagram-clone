// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage, ref } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyAReZ9nIESO62Pf8id-hA5u94sPdlY91Qc",
    authDomain: "instagram-clone-2f83c.firebaseapp.com",
    projectId: "instagram-clone-2f83c",
    storageBucket: "instagram-clone-2f83c.appspot.com",
    messagingSenderId: "978459912277",
    appId: "1:978459912277:web:907ba37766552caf24ccdc",
    measurementId: "G-MHET943Y6L"
  };

  
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = getStorage(firebaseApp);
  const storageRef = ref(storage);

  

  export{db, auth, storage, storageRef};