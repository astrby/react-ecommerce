import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const apiKey = process.env.REACT_APP_APIKEY;
const authDomain = process.env.REACT_APP_AUTHDOMAIN;
const projectId = process.env.REACT_APP_PROJECTID;
const messagingSenderId = process.env.REACT_APP_MESSAGINGSENDERID;
const appId = process.env.REACT_APP_APPID

//Uso de Firebase para guardar información de usuarios y artículos.
const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: "react-ecomerce-62065",
    storageBucket: "react-ecomerce-62065.appspot.com",
    messagingSenderId: messagingSenderId,
    appId: appId
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const imagenes = getStorage(app);

  export {db, imagenes};