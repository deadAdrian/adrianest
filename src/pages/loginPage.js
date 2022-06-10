import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion';
import { Header } from '../components/header';
import {createAccount, loginGoogle, loginEmail} from '../components/firebaseStuff';
import '../pageStyles/loginPage.scss';


const loginDivVariants = {
    hidden:{
        x: "100vw"
    },
    visible:{
        x: 0,
        opacity: 1,
        transition:{
            delay: 0.3, 
            type:"spring", 
            stiffness: 80
        }
    },
    variant1In:{
        x: [0, -200, 0],
        opacity: 0,
        scale: 0.5,
        zIndex: 1,
        transition:{
            duration: 1,
        }
    },
    variant2In:{
        x: 0,
        opacity: 1,
        zIndex: 2,
        scale: 1,
        transition:{
            delay: 0.5,
        }
    }
}

const signUpDivVariants = {
    hidden:{
        zIndex: -1,
        opacity: 0,
        scale: 0.5
    },
    visibleUp:{
        opacity: 1,
        zIndex: 2,
        scale: 1,
        transition:{
            delay: 0.5,
        }
    },
    variant1Up:{
        x: [0, -200, 0],
        opacity: 0,
        scale: [1, 0.8],
        zIndex: 1,
        transition:{
            duration: 1,
        }
    }
    
}

export const LoginPage = (props) => {
    const [currentStateLogin, setCurrentStateLogin] = useState("visible");
    const [currentStateSignUp, setCurrentStateSignUp] = useState("");
    const [createAcc, setCreateAcc] = useState({username: "", email: "", password: "", confirmPassword: ""});
    const navigate = useNavigate();

    const signUpAnimation = () => {
        setCurrentStateLogin("variant1In");
        setCurrentStateSignUp("visibleUp");
    }

    const signInAnimation = () => {
        setCurrentStateLogin("variant2In");
        setCurrentStateSignUp("variant1Up");
    }

    const handleChange1 = (e) => {
        switch(e.target.id){
            case 'signUpEmail':{
                setCreateAcc({...createAcc, email: e.target.value});
                break;
            }case 'signUpPass':{
                setCreateAcc({...createAcc, password: e.target.value});
                verifyPassword();
                break;
            }case 'signUpConfirmPass':{
                setCreateAcc({...createAcc, confirmPassword: e.target.value});
                verifyPassword();
                break;
            }case 'signUpUsername':{
                setCreateAcc({...createAcc, username: e.target.value});
                break;
            }
        }
    }

    

    

    const verifyPassword = () => {
        const pass = document.getElementById('signUpPass');
        const confirmPass = document.getElementById('signUpConfirmPass');

        if(pass.value !== confirmPass.value){
            pass.setCustomValidity("Passwords don't match");
        }else if(pass.value.length < 8){
            pass.setCustomValidity("Your password must have at least 8 characters");
        }else{
            pass.setCustomValidity("");
        }

    }

    return (
        <div className="loginPage" >
            <Header logged={props.logged}  homepage={true}/>
            <motion.div className="loginDiv"
                variants={loginDivVariants}
                initial="hidden"
                animate={currentStateLogin}
                onKeyDown={(e) => {
                    if(e.key === 'Enter'){
                        loginEmail(document.getElementById('signInEmail').value, document.getElementById('signInPass').value, props.setUserState, props.setLoginModal, navigate, props.setUserPic);
                    }
                }}
            >
                <h2>Sign In</h2>

                <div className="inputsDiv">
                    <div className="myInput">
                        <input id="signInEmail" type="text" placeholder="email"/>
                        <p className="usernameIndicator">email</p>
                    </div>
                    <div className="myInput">
                        <input id="signInPass" type="password" placeholder="password"/>
                        <p className="usernameIndicator">password</p>
                    </div>
                </div>

                <div className="loggingDiv">
                    <div className='loginButtonDiv'>
                        
                        <div
                            className="span1"
                            onClick={() => {
                                loginEmail(document.getElementById('signInEmail').value, document.getElementById('signInPass').value, props.setUserState, props.setLoginModal, navigate, props.setUserPic);
                            }}
                        >Login</div>
                        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    </div>
                    
                    <div onClick={() => {loginGoogle(props.setUserState, props.setLoginModal, navigate, props.setUserPic)}} className="logoGoogleDiv">
                        <img src={`${process.env.PUBLIC_URL}/assets/imgs/googleIcon.png`}></img>
                    </div>
                    
                </div>

                <div className="orDiv">
                    <p>Or</p>
                    <hr/>
                </div>

                <div className="loginOptions">
                    <motion.p
                        onClick={signUpAnimation}
                        className="createAccP"
                        whileHover={{ scale: 1.1 }}
                        transition={{type: "spring", stiffness:150}}
                    >Create account</motion.p>
                </div>
                
                
            </motion.div>

            <motion.div 
                className="signUpDiv"
                variants={signUpDivVariants}
                initial="hidden"
                animate={currentStateSignUp}
            >
                <div className="headerSignUp">
                    <motion.i 
                        onClick={signInAnimation} 
                        whileHover={{scale: 1.2}}
                        transition={{type: "spring", stiffness:120}}
                        className='bx bx-chevron-left'
                    ></motion.i>
                    <h2>Sign Up</h2>
                </div>
                

                <div>
                    <form 
                        onSubmit={(e) => {
                            e.preventDefault();
                            createAccount(createAcc.email, createAcc.password, signInAnimation, setCreateAcc, createAcc.username, props.setLoginModal, navigate);
                        }}
                        className="inputsDiv"
                    >
                        <div className="myInput">
                            <input value={createAcc.username} onChange={handleChange1} id='signUpUsername' type="text" placeholder="username" maxLength="8" required/>
                            <p className="usernameIndicator">username</p>
                        </div>
                        <div className="myInput">
                            <input value={createAcc.email} onChange={handleChange1} id='signUpEmail' type="email" placeholder="email" required/>
                            <p className="usernameIndicator">email</p>
                        </div>
                        <div className="myInput">
                            <input value={createAcc.password} onChange={handleChange1} id='signUpPass' type="password" placeholder="password" required/>
                            <p className="usernameIndicator">password</p>
                        </div>
                        <div className="myInput">
                            <input value={createAcc.confirmPassword}onChange={handleChange1} id='signUpConfirmPass' type="password" placeholder="password" required/>
                            <p className="usernameIndicator">confirm password</p>
                        </div>

                        <div className="btnSignUpDiv">
                            <motion.button
                                className="createAccBtn"
                                whileHover={{ scale: 1.05 }}
                                transition={{type: 'spring', stiffness: 120}}

                            >Create account</motion.button>
                        </div>
                    </form>
                    
                </div>
            </motion.div>
        </div>
    );
}

