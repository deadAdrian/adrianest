import React, {useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion';
import '../pageStyles/feedModal.scss';
import {auth} from './firebaseStuff';

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



export const FeedModal = ({visible, setModalOptions, setFloatin, setFileModal}) => {
    let timeout1;
    let navigate = useNavigate();

    useEffect(() => {
    
        return () => {
            if(!document.getElementsByClassName('shadow')[0]?.style || !document.getElementsByClassName('floatinBtn')[0]?.style){
                clearTimeout(timeout1);
            }
            
        }
    });
    return (
        <div className='shadow' onClick={() => {
            setModalOptions("hidden");
            setFloatin("visible");
            timeout1 = setTimeout(() => {
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
                <motion.p 
                    onClick={() => {
                        setFileModal("visible");
                        document.getElementsByClassName('shadow1')[0].style.display = 'block';
                    }} 
                    whileHover={{scale: 1.1}}
                >Add Image
                </motion.p>
                <Link to="/profile"><motion.p whileHover={{scale: 1.1}}>Profile</motion.p></Link>
                <motion.p whileHover={{scale: 1.1}} onClick={() => {auth.signOut(); navigate("/")}}>Logout</motion.p>
            </motion.div>
        </div>
        
    );
}