import React from "react";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../pageStyles/myHeader.scss';

export const Header = () => {

    return (
        <motion.div className="myHeader"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1}}
        >
            <Link to="/"><img src={`${process.env.PUBLIC_URL}/assets/imgs/logo.png`} /></Link>
        </motion.div>
    );
}
