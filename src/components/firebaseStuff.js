import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,
    signInWithEmailAndPassword 

} from "firebase/auth";
import { useReducedMotion } from "framer-motion";


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
const auth = getAuth();
const provider = new GoogleAuthProvider();

//register a user with email and password
export const createAccount = (email, password, signInAnimation, setCreateAcc, setUserState) => {
    
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Account sucessfully created");
        signInAnimation();
        setCreateAcc({email: "", password: "", confirmPassword: ""});
        setUserState({logged: true, user: user.email});
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorCode, errorMessage);
        // ..
    });
}

export const loginGoogle = (setUserState) => {
    
    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUserState({logged: true, user: user.displayName});
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
}

export const loginEmail = (email, password, setUserState) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            setUserState({logged: true, user: user.email});
            console.log("sucess");
            // ...
        })
        .catch((error) => {
            console.log(email, password);
            const errorCode = error.code;
            const errorMessage = error.message;
            
            console.log(errorCode, errorMessage);
        });
}
