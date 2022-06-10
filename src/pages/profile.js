import React, {useState, useEffect} from 'react';
import { useNavigate, Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import { Header } from '../components/header';
import { ProfileImgsModal } from '../components/profileImgsModal';
import { auth } from '../components/firebaseStuff';
import '../pageStyles/profile.scss';

export const Profile = ({init, user, userPic, setUserPic}) => {
    const [picsModal, setPicsModal] = useState("hidden");
    let navigate = useNavigate();
    let timeout2;

    

    const showModal = () => {
        setPicsModal("visible");
        document.getElementsByClassName('shadow')[0].style.display = 'block';
    }

    if(init && auth.currentUser){
        return null;
    }else if(!init && auth.currentUser){
        clearTimeout(timeout2);
        return (
            <div className="profile">
                <Header logged={user.logged} username={user.username} homepage={false} feed={false}/>
                <ProfileImgsModal visible={picsModal} setUserPic={setUserPic} setPicsModal={setPicsModal} username={user.username} email={auth.currentUser.email}/>
                <div className="topProfile">
                    <Link to="/feed">
                        <motion.i 
                            whileHover={{scale: 1.2}}
                            transition={{type: "spring", stiffness:200}}
                            className='bx bx-chevron-left'
                        ></motion.i>
                    </Link>
                    <h1>Profile</h1>
                </div>

                <div className="profileConfigs">
                    <div className="profilePicDiv">
                        
                        <img src={`${process.env.PUBLIC_URL}/assets/profilePics/${userPic}`}className="profilePic"/>
                        <p onClick={showModal}>Change</p>
                    </div>
                </div>
            </div>
        )
    }else{
        timeout2 = setTimeout(() => {
            if(!auth.currentUser){
                navigate("/");
            }
        } ,2000);
        
    }

    
}