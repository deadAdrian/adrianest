import React from 'react';
import {motion} from 'framer-motion';
import '../pageStyles/feedModal.scss';

const feedModalVariants = {
    hidden:{
        x: '100vw'
    },
    visible:{
        x: 0,
        transition:{

        }

    }
}



export const FeedModal = ({visible, setModalOptions, setFloatin}) => {


    return (
        <div className='shadow' onClick={() => {
            setModalOptions("hidden");
            setFloatin("visible");
            setTimeout(() => {
                document.getElementsByClassName('shadow')[0].style.display = 'none';
                document.getElementsByClassName('floatinBtn')[0].style.pointerEvents = 'all';
            }, 100);
        }}>
            <motion.div 
                variants={feedModalVariants}
                initial="hidden"
                animate={visible}
                className="feedModal"
            >
                <motion.p whileHover={{scale: 1.1}}>Add Image</motion.p>
                <motion.p whileHover={{scale: 1.1}}>Settings</motion.p>
                <motion.p whileHover={{scale: 1.1}}>Logout</motion.p>
            </motion.div>
        </div>
        
    );
}