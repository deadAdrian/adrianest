import React, {useState} from 'react';
import {motion} from 'framer-motion';
import '../pageStyles/floatinBtn.scss';



const floatinVariants = {
    hidden: {
        scale: 0,
        opacity: 0
    },
    visible:{
        scale: 1,
        opacity: 1
    },
    whileHover:{
        scale: 1.2,  
    }
}

export const FloatinBtn = ({floatin, setFloatin, setModalOptions}) => {
    

    const hideForMe = () => {
        setFloatin("hidden");
        setModalOptions("visible");
        document.getElementsByClassName('floatinBtn')[0].style.pointerEvents = 'none';
        document.getElementsByClassName('shadow')[0].style.display = 'block';
    }

    return (
        <motion.div
            onClick = {hideForMe}
            variants={floatinVariants}
            initial="hidden"
            animate={floatin}
            whileHover="whileHover"
            className="floatinBtn"
        >
            +
        </motion.div>
    );
}