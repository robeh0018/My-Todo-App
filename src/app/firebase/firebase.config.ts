import {initializeApp} from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyATA35q-CaYBxz441ANMyRe-_sfK1-JA0c",
    authDomain: "todoapp-63612.firebaseapp.com",
    projectId: "todoapp-63612",
    storageBucket: "todoapp-63612.appspot.com",
    messagingSenderId: "810744667755",
    appId: "1:810744667755:web:d451c5037efd87192d9b2e"
};

const app = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(app);
export const FirebaseDB = getFirestore(app);
