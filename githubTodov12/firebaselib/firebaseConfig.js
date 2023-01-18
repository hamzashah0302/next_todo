import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyBpXzpbhBu2XIFX9Llqp1y9a2iSsFhr4Ko",
    authDomain: "test-fedcc.firebaseapp.com",
    projectId: "test-fedcc",
    storageBucket: "test-fedcc.appspot.com",
    messagingSenderId: "565223219198",
    appId: "1:565223219198:web:5ec0fd9be072e223a0aaaf",
    measurementId: "G-4YKKQZT3EQ"
  };

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });