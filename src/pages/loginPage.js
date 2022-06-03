import React from 'react';
import {Header} from '../components/header';
import {motion} from 'framer-motion';
import '../pageStyles/loginPage.scss';

const containerVariants = {
    hidden:{
        x: "100vw"
    },
    visible:{
        x: 0,
        transition:{
            delay: 0.3, 
            type:"spring", 
            stiffness: 80
        }
    }
}

export const LoginPage = () => {

    return (
        <div className="loginPage">
            <motion.div className="loginDiv"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <h2>Sign In</h2>

                <div className="inputsDiv">
                    <div className="myInput">
                        <input type="text" placeholder="email"/>
                        <p className="usernameIndicator">email</p>
                    </div>
                    <div className="myInput">
                        <input type="password" placeholder="password"/>
                        <p className="usernameIndicator">password</p>
                    </div>
                </div>

                <div className="loggingDiv">
                    <span>&#10230;</span>
                    <div className="logoGoogleDiv">
                        <img src={`${process.env.PUBLIC_URL}/assets/imgs/googleIcon.png`}></img>
                    </div>
                    
                </div>

                <div className="orDiv">
                    <p>Or</p>
                    <hr/>
                </div>

                <div className="loginOptions">
                    <motion.p
                        className="createAccP"
                        whileHover={{ scale: 1.07 }}
                        transition={{type: "spring", stiffness:150}}
                    >Create account</motion.p>
                </div>
                
                
            </motion.div>
        </div>
    );
}

