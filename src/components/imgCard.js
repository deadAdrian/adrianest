import React from 'react';
import {motion} from 'framer-motion'

export const ImgCard = ({src, manageImgInfoModal}) => {

    return(
        <motion.div 
            whileHover={{
                scale: 1.01
            }}
            className="imgCard"
            onClick={manageImgInfoModal}
        >
            <img  src={src}  />
        </motion.div>
    );
}