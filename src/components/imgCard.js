import React from 'react';
import {motion} from 'framer-motion'

export const ImgCard = ({src, manageImgInfoModal, name}) => {

    return(
        <motion.div 
            whileHover={{
                scale: 1.01
            }}
            className="imgCard"
            onClick={() => {manageImgInfoModal(name, src);}}
        >
            <img  src={src}  />
        </motion.div>
    );
}