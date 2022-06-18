import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,
    signInWithEmailAndPassword, setPersistence, browserSessionPersistence,onAuthStateChanged 

} from "firebase/auth";
import { getFirestore, collection, setDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, listAll, uploadBytes } from "firebase/storage";

//prepare to get mad cause this is pure madnesssssssss

//this variables below that arent functions are initializations of firebase itself
//then i will not explain it
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


//this function is called every time the feed is mounted, it catch all the image from the firebase storage
export const catchImgs = (setImgs, setInitFeed) => {
    const listRef = ref(storage, "images");
    const imgsSrc = [];
    listAll(listRef)
        .then((list) => {
            list.items.forEach((img) => {

                getDownloadURL(ref(storage, img._location.path))
                    .then((url) => {                    
                        imgsSrc.push({url: url, name: img.name});         
                    })
                    .catch((error) => {
                        console.log(error);
                    });

            });
            
        }).then(() => {
            setImgs(imgsSrc);
            setTimeout(() => {setInitFeed(false)}, 4000);    
        })
        .catch((error) => {
            console.log(error);
        });
    
}

//some of the params are used in other function so i will not explain again xD.
//other functions presents here are reused inside of some main ones, so if its note explained-
//in the top of the function look out for it, you should find.

//register a user with email and password
//signInAnimation moves the sign in div, so the user can login immediatly
//setCreateAcc resets the inputs fields on the sign up div
//setLoginModal set the modal with the info about the log process (if it was okay or some error)
export const createAccount = async (email, password, signInAnimation, setCreateAcc, username, setLoginModal, navigate) => {
    
    const verify1 = await verifyUsername(username);
    
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

//login a user with google account.
//setUserState updates the userState on <App /> with the username and the logged property
//navigate takes the user directly to the feed after the succeed login
//setUserPic gets the picture of ther user from firebase and sets it
export const loginGoogle = (setUserState, setLoginModal, navigate, setUserPic) => {
    setPersistence(auth, browserSessionPersistence)
        .then(() => {
            signInWithPopup(auth, provider)
                .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;

                    
                    verifyUsername(user.displayName)
                        .then((result) => {
                            if(result){
                                registerUsername(user.email, user.displayName);
                            }
                        })
                        .catch((error) => (console.log(error)));
                    setUserState({logged: userLogged() ? true : false, username: user.displayName});
                    getUsername(user.email)
                        .then((result) => {
                            setUserPic(result.pic)
                        })
                        .catch((error) => {console.log(error)});
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

//login a user with email and password.
export const loginEmail = (email, password, setUserState, setLoginModal, navigate, setUserPic) => {
    spinnerShower(true);

    setPersistence(auth, browserSessionPersistence)
    .then(() => {
        return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in    
            spinnerShower(false);
            const user = userCredential.user;
            let username1;
            getUsername(email)
                .then((result) => {
                    username1 = result.username;
                    setUserState({logged: userLogged() ? true : false, username: username1});
                    setUserPic(result.pic);
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

//Here we set a document on firebase for every user with the username-
//the default profile picture that can be changed, the imgs the user uploaded 
// and the images the user liked
const registerUsername = async (email, username) => {

    await setDoc(doc(db, "users", `${email}`), {
        profilePic: 'defaultUser.png',
        username: username,
        imgs: [ ],
        likes: [ ]
    });

}

//Here we get a username from firebase with a given email
export const getUsername = async (email) => {
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        let info = {
            username: docSnap.data().username, 
            pic: docSnap.data().profilePic
        }
        
        return info;
    } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    }
}

//that one is simple, we check if there is a current user and return it
export const userLogged = () => {
    if(auth.currentUser){
        return true;
    }else{
        return false;
    }
}


//here we check if a username already exists in database to prevent repeated ones
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


//Update the profile picture of a user in database
export const updateProfileImage = async (email, username, image, setUserPic) => {

    try{
        const docRef = doc(db, "users", email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {

            await setDoc(doc(db, "users", `${email}`), {
                ...docSnap.data(),
                profilePic: image
            });
        
            setUserPic(image);

        
        } else {
        // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }catch(error){
        console.log(error);
    }

    
}

//turns the spinner on the login page to be shown or not
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

//updates a new username of a user on database
export const changeUsername = async (username, picture, setLoginModal) => {
    const verify = await verifyUsername(username);

    if(!verify){
        setLoginModal({color: "red", message: "This username already exists", visible: "visible"});  
        setTimeout(() => {setLoginModal({color: "red", message: "This username already exists", visible: "hidden"});}, 2000);
    }else{

        try{
            const docRef = doc(db, "users", auth.currentUser.email);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
    
                await setDoc(doc(db, "users", auth.currentUser.email), {
                    ...docSnap.data(),
                    username: username
                });
                
                setLoginModal({color: "green", message: "Username changed with sucess", visible: "visible"});  
                setTimeout(() => {setLoginModal({color: "green", message: "Username changed with sucess", visible: "hidden"});}, 2000);

            } else {
            // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }catch(error){
            console.log(error);
        }
        
    }
       
}

//uploads a image to firebase storage and a document with the info that will be used-
//(title, likes, comments)
export const uploadImg = async (file, title, picture, setInitFeed, setImgs, setLoginModal) => {

    try{

        //get the user data for updating the new image
        const docRef = doc(db, "users", auth.currentUser.email);
        const docSnap = await getDoc(docRef);

        //Uses the title to generate image tags that will be used in search funcionality
        const imgTags = title.toLowerCase().split(" ");

        //create image info object that will be pushed into existing array of imgs in user data
        const picInfo = {
            title: title,
            name: picture,
            likes: 0,
            comments: [ ],
            tags: imgTags
        }

        //create a resumed image info object saved on user data for query purposes
        const userPicInfo = {
            title: title,
            name: picture,
        }

        //update the data in images as well
        await setDoc(doc(db, "images", `${picture}`), picInfo);

        //update user data
        if (docSnap.exists()) {
            let nextImgs = [...docSnap.data().imgs, userPicInfo];
            await setDoc(doc(db, "users", auth.currentUser.email), {
                ...docSnap.data(),
                imgs: nextImgs
            });
            
            const storageRef = ref(storage, `images/${picture}`);

            // 'file' comes from the Blob or File API
            uploadBytes(storageRef, file).then((snapshot) => {
                catchImgs(setImgs, setInitFeed);
                setLoginModal({color: "green", message: "Image uploaded", visible: "visible"});
                setTimeout(() => {setLoginModal({color: "green", message: "Image uploaded", visible: "hidden"});}, 2000);
            });
        } else {
        // doc.data() will be undefined in this case
            console.log("No such document!");
        }

    }catch(error){
        console.log(error)
    }
    
}


//gets the image info from firebase to be used in imgInfoModal
export const getImgData = async (name) => {
    const docRef = doc(db, "users", auth.currentUser.email);
    const docSnap = await getDoc(docRef);

    const docRefImg = doc(db, "images", name);
    const docSnapImg = await getDoc(docRefImg);

    let imgInfo;

    if (docSnapImg.exists() && docSnap.exists()) {
        
        imgInfo = docSnapImg.data();
        imgInfo.liked = docSnap.data().likes.includes(name);
        
        return imgInfo;

    } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    }
}


//Increments or decrements like on a picture
export const likeOrDeslike = async (name, setCanUserLike, setLikes) => {

    //This prevent user from spamming like button and cause async errors
    setCanUserLike(false);

    //gets user reference
    const docRef = doc(db, "users", auth.currentUser.email);
    const docSnap = await getDoc(docRef);

    //gets image reference
    const docRefImg = doc(db, "images", name);
    const docSnapImg = await getDoc(docRefImg);

    

    if (docSnap.exists() && docSnapImg.exists()) {

        //create a copy of users likes array
        const likeCopy = [...docSnap.data().likes];

        //if the image is already liked then remove from liked images user array and update data
        if(docSnap.data().likes.includes(name)){
            likeCopy.splice(docSnap.data().likes.indexOf(name), 1);

            await setDoc(doc(db, "users", auth.currentUser.email), {
                ...docSnap.data(),
                likes: likeCopy
            });

            //and decrements the likes on image data as well
            await setDoc(doc(db, "images", name), {
                ...docSnapImg.data(),
                likes: docSnapImg.data().likes - 1
            });

        }else{
            //otherwise includes the liked image on user data
            likeCopy.push(name);

            await setDoc(doc(db, "users", auth.currentUser.email), {
                ...docSnap.data(),
                likes: likeCopy
            });

            //and increments the likes on image data as well
            await setDoc(doc(db, "images", name), {
                ...docSnapImg.data(),
                likes: docSnapImg.data().likes + 1
            });
        }

        //gets a updated img reference so the likes can be updated on time
        const docRefImg2 = doc(db, "images", name);
        const docSnapImg2 = await getDoc(docRefImg);
        setLikes(docSnapImg2.data().likes);

        //allows user to like/deslike again;
        setCanUserLike(true);

    } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    }
}


//adds a comment on image data on firebase
export const addComment = async (imgName, comment, setComments) => {

    try{
        //gets user reference
        const docRef = doc(db, "users", auth.currentUser.email);
        const docSnap = await getDoc(docRef);
        
        //gets image reference
        const docRefImg = doc(db, "images", imgName);
        const docSnapImg = await getDoc(docRefImg);

        
        if(docSnapImg.exists() && docSnap.exists()){
            
            //Create a comment object with user info
            const commentInfo = {
                email: auth.currentUser.email,
                comment: comment,
            }
            
            //Create a comments copy for modification and updates
            const commentsCopy = [...docSnapImg.data().comments, commentInfo];

            //and update the comments on the database
            await setDoc(doc(db, "images", imgName), {
                ...docSnapImg.data(),
                comments: commentsCopy
            });

            //Resets the comment input field and sets the news comments
            document.getElementById('commentInput').value = "";
            setComments(commentsCopy);
        }else{
            console.log('no such document!');
        }

    }catch(error){
        console.log(error);
    }
    

}