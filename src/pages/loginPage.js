import React from 'react';
import {Header} from '../components/header';
import '../pageStyles/loginPage.scss';

export const LoginPage = () => {

    return (
        <div className="loginPage">
            <Header />
            <div className="loginDiv">
                <h2>Sign In</h2>

                <div className="inputsDiv">
                    <div className="myInput">
                        <input type="text" placeholder="username"/>
                        <p className="usernameIndicator">username</p>
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
                
                
            </div>
        </div>
    );
}

