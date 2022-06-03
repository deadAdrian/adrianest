import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAFXoE3wEDvMCf3xTpcyk0O1riQnzYKwHw",
    authDomain: "adrianest-85bb1.firebaseapp.com",
    projectId: "adrianest-85bb1",
    storageBucket: "adrianest-85bb1.appspot.com",
    messagingSenderId: "543598301089",
    appId: "1:543598301089:web:1feb4e04b16b52ea0045e0",
    measurementId: "G-NTRFZS1Y8V"
};
const app = initializeApp(firebaseConfig);


//register a user with email and password
export const createAccount = (email, password) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
}