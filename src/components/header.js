import React from "react";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../pageStyles/myHeader.scss';

export const Header = ({logged, user, homepage, feed}) => {

    return (
        <motion.div className="myHeader"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1}}
        >
            <Link to="/feed"><img src={`${process.env.PUBLIC_URL}/assets/imgs/logo.png`} /></Link>

            {feed &&
                <input placeholder="Search" className="searchInput" type="text"/>
            }
            {logged && !homepage &&
                <p>Welcome, {user}</p>
            }
        </motion.div>
    );
}
