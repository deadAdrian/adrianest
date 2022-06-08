import React from 'react';
import {motion} from 'framer-motion'

export const ImgCard = ({src}) => {

    return(
        <motion.div 
            whileHover={{
                scale: 1.01
            }}
            className="imgCard"
        >
            <img  src={src} />
        </motion.div>
    );
}