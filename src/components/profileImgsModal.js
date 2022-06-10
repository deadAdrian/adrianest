import React from 'react';
import {motion} from 'framer-motion';
import { updateProfileImage } from './firebaseStuff';

const profileImgsVariants = {
    hidden: {
        x: '100vw'
    },
    visible:{
        x:0
    }
}

export const ProfileImgsModal = ({visible, setPicsModal, setUserPic, username, email}) => {
    

    return (
        <div className='shadow' onClick={() => {
            setPicsModal("hidden");
            setTimeout(() => {document.getElementsByClassName('shadow')[0].style.display = 'none';}, 100);
        }}>
            <motion.div 
            className="profileImgsModal"
            variants={profileImgsVariants}
            initial="hidden"
            animate={visible}
             >
                <motion.img onClick={() => {updateProfileImage(email, username, 'defaultUser.png', setUserPic)}} whileHover={{scale:1.1}} src={`${process.env.PUBLIC_URL}/assets/profilePics/defaultUser.png`}/>
                <motion.img onClick={() => {updateProfileImage(email, username,'bmo.png', setUserPic)}} whileHover={{scale:1.1}} src={`${process.env.PUBLIC_URL}/assets/profilePics/bmo.png`}/>
                <motion.img onClick={() => {updateProfileImage(email, username,'marceline.png', setUserPic)}} whileHover={{scale:1.1}} src={`${process.env.PUBLIC_URL}/assets/profilePics/marceline.png`}/>
                <motion.img onClick={() => {updateProfileImage(email, username,'iceking.png', setUserPic)}} whileHover={{scale:1.1}} src={`${process.env.PUBLIC_URL}/assets/profilePics/iceking.png`}/>
                <motion.img onClick={() => {updateProfileImage(email, username,'beth.png', setUserPic)}} whileHover={{scale:1.1}} src={`${process.env.PUBLIC_URL}/assets/profilePics/beth.png`}/>
                <motion.img onClick={() => {updateProfileImage(email, username,'rick.png', setUserPic)}} whileHover={{scale:1.1}} src={`${process.env.PUBLIC_URL}/assets/profilePics/rick.png`}/>
                <motion.img onClick={() => {updateProfileImage(email, username,'jessica.png', setUserPic)}} whileHover={{scale:1.1}} src={`${process.env.PUBLIC_URL}/assets/profilePics/jessica.png`}/>
                <motion.img onClick={() => {updateProfileImage(email, username,'bojack.png', setUserPic)}} whileHover={{scale:1.1}} src={`${process.env.PUBLIC_URL}/assets/profilePics/bojack.png`}/>
                <motion.img onClick={() => {updateProfileImage(email, username,'diane.png', setUserPic)}} whileHover={{scale:1.1}} src={`${process.env.PUBLIC_URL}/assets/profilePics/diane.png`}/>
            </motion.div>
        </div>
        
    );
}