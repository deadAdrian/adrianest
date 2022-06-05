import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,
    signInWithEmailAndPassword 

} from "firebase/auth";
import { getFirestore, collection, setDoc, doc, getDoc } from "firebase/firestore";


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
const db = getFirestore(app);


//register a user with email and password
export const createAccount = (email, password, signInAnimation, setCreateAcc, setUserState, username) => {
    
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Account sucessfully created");
        signInAnimation();
        registerUsername(user.email, username);
        setCreateAcc({username: "", email: "", password: "", confirmPassword: ""});
        getUsername(email)
                .then((result) => {
                    username = result;
                    setUserState({logged: userLogged(), user: username});
                })
                .catch((error) => {
                    console.log(error);
                })
        
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorCode, errorMessage);
        // ..
    });
}

//register a user with google account
export const loginGoogle = (setUserState) => {
    
    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUserState({logged: userLogged(), user: user.displayName});
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

//login a user with email and password
export const loginEmail = (email, password, setUserState) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            let username;
            getUsername(email)
                .then((result) => {
                    username = result;
                    setUserState({logged: userLogged(), user: username});
                })
                .catch((error) => {
                    console.log(error);
                })
            
            // ...
        })
        .catch((error) => {
            console.log(email, password);
            const errorCode = error.code;
            const errorMessage = error.message;
            
            console.log(errorCode, errorMessage);
        });
}

const registerUsername = async (email, username) => {

    await setDoc(doc(db, "users", `${email}`), {
        username: username
    });
}

const getUsername = async (email) => {
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return (docSnap.data().username) ;
    } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    }
}

export const userLogged = () => {
    if(auth.currentUser){
        return true;
    }else{
        return false;
    }
}