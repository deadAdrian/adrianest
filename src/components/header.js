import React from "react";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../pageStyles/myHeader.scss';

export const Header = ({logged, user}) => {

    return (
        <motion.div className="myHeader"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1}}
        >
            <Link to="/"><img src={`${process.env.PUBLIC_URL}/assets/imgs/logo.png`} /></Link>

            {logged && 
                <p>Welcome, {user}</p>
            }
        </motion.div>
    );
}
