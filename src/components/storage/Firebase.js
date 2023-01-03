import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

//Uso de Firebase para guardar información de usuarios y artículos.
const firebaseConfig = {
    apiKey: "X",
    authDomain: "X",
    projectId: "X",
    storageBucket: "X",
    messagingSenderId: "X",
    appId: "X"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const imagenes = getStorage(app);

  export {db, imagenes};