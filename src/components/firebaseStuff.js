import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,
    signInWithEmailAndPassword, setPersistence, browserSessionPersistence,onAuthStateChanged 

} from "firebase/auth";
import { getFirestore, collection, setDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";

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
export const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage();

export const catchImgs = (setImgs, setInitFeed) => {
    const listRef = ref(storage, "images");
    const imgsSrc = [];
    listAll(listRef)
        .then((list) => {
            console.log(list);
            list.items.forEach((img) => {

                getDownloadURL(ref(storage, img._location.path))
                    .then((url) => {                    
                        imgsSrc.push(url);         
                    })
                    .catch((error) => {
                        console.log(error);
                    });

            });
            
        }).then(() => {
            console.log(imgsSrc);
            setImgs(imgsSrc);
            setTimeout(() => {setInitFeed(false)}, 4000);    
        })
        .catch((error) => {
            console.log(error);
        });
    
}




export const esperaai  = (setInit, setUserState, setImgs) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        user.displayName ? setUserState({user: user.displayName, logged: true}) :
        getUsername(user.email)
            .then((username) => {
                setUserState({user: username, logged: true});
                setInit(false);
            })
            .catch((error) => { console.log(error) });
        } else {
        // User is signed out
        // ...
        }
    });
};


//register a user with email and password
export const createAccount = async (email, password, signInAnimation, setCreateAcc, username, setLoginModal, navigate) => {
    
    const verify1 = await verifyUsername(username);
    console.log(verify1);
    if(verify1){
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                setLoginModal({color: "green", message: "Account sucessfully created", visible: "visible"});
                setTimeout(() => {setLoginModal({color: "green", message: "Account sucessfully created", visible: "hidden"});}, 2000);
                signInAnimation();
                registerUsername(user.email, username);
                setCreateAcc({username: "", email: "", password: "", confirmPassword: ""});
               
        
            })
            .catch((error) => {
                const errorCode = error.code;
                switch(errorCode){
                    case 'auth/email-already-in-use':{
                        setLoginModal({color: "red", message: "This email is already in use!", visible: "visible"});
                        setTimeout(() => {setLoginModal({color: "red", message: "This email is already in use!", visible: "hidden"});}, 2000);
                        
                    }
                }
                
                // ..
            });
    }else{
        setLoginModal({color: "red", message: "This username is already in use!", visible: "visible"});
        setTimeout(() => {setLoginModal({color: "red", message: "This username is already in use!", visible: "hidden"});}, 2000);
        
    }
    
}

//register a user with google account
export const loginGoogle = (setUserState, setLoginModal, navigate) => {
    setPersistence(auth, browserSessionPersistence)
        .then(() => {
            signInWithPopup(auth, provider)
                .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;
                    setUserState({logged: userLogged() ? true : false, user: user.displayName});
                    setLoginModal({color: "green", message: "You are sucessfully logged in", visible: "visible"});
                    setTimeout(() => {setLoginModal({color: "green", message: "You are sucessfully logged in", visible: "hidden"});}, 2000);
                    navigate("/redirect", {replace: true});
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
        })
        .catch((error) => {
            console.log(error);
        })
    
}

//login a user with email and password
export const loginEmail = (email, password, setUserState, setLoginModal, navigate) => {
    spinnerShower(true);

    setPersistence(auth, browserSessionPersistence)
    .then(() => {
        return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in    
            spinnerShower(false);
            const user = userCredential.user;
            let username;
            getUsername(email)
                .then((result) => {
                    username = result;
                    setUserState({logged: userLogged() ? true : false, user: username});
                    setLoginModal({color: "green", message: "You are sucessfully logged in", visible: "visible"});
            
                    setTimeout(() => {setLoginModal({color: "green", message: "You are sucessfully logged in", visible: "hidden"});}, 2000);
                    navigate("/redirect", {replace: true});
                })
                .catch((error) => {
                    console.log(error);
                })
            
            // ...
        })
        .catch((error) => {
            spinnerShower(false);
            const errorCode = error.code;
            setLoginModal({color: "red", message: "Email or password wrong", visible: "visible"});
            setTimeout(() => {setLoginModal({color: "red", message: "Email or password wrong", visible: "hidden"});}, 2000);
            
        });
    })
    .catch((error) => {
        console.log(error.code)
    });
    
}

const registerUsername = async (email, username) => {

    await setDoc(doc(db, "users", `${email}`), {
        username: username
    });
}

export const getUsername = async (email) => {
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

const verifyUsername = async (username) => {
    let mdsEm = true;
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
        if(doc.data().username === username){
            mdsEm = false;
        }
    });
    return mdsEm;
    
}

const spinnerShower = (x) => {
    let spinner = document.getElementsByClassName('lds-ellipsis')[0];
    let span1 = document.getElementsByClassName('span1')[0];

    if(x){
        spinner.style.display = 'inline-block';
        span1.style.display = 'none';
    }else{
        spinner.style.display = 'none';
        span1.style.display = 'flex';
    }
}