import React from 'react';
import {motion} from 'framer-motion';
import '../pageStyles/loginModal.scss';

const modalVariants = {
    hidden:{
        y: -300
    },
    visible:{
        y: -100,
    }
}

export const LoginModal = (props) => {

    return (
        <motion.div 
            className="loginModal" 
            style={{backgroundColor: props.info.color, color: 'white'}}
            variants={modalVariants}
            initial="hidden"
            animate={props.info.visible}
        >
            <p>{props.info.message}</p>
        </motion.div>  
    );
}