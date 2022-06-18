import React from "react";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../pageStyles/myHeader.scss';

export const Header = ({logged, username, homepage, feed, userPic}) => {
    return (
        <motion.div className="myHeader"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1}}
        >
            <div className="logoDiv">
                <Link to="/redirect"><img src={`${process.env.PUBLIC_URL}/assets/imgs/logo.png`} /></Link>
            </div>
            

            
            
            {logged && !homepage &&
                <Link to="/profile">
                    <div className="userImage">
                        <img className="imageItself" src={`${process.env.PUBLIC_URL}/assets/profilePics/${userPic}`}/>
                    </div>
                </Link>
                //<p>Welcome, {username}</p>
            }
        </motion.div>
    );
}
