import React, {useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion';
import '../pageStyles/feedModal.scss';
import {auth} from './firebaseStuff';


//the states of the feed modal to be used in framer-motion library
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


// the visible prop indicates if the feed modal must be shown or not
// setModalOptions hiddes the modal from the inside
// setFloatin hides/show the float button, setFileModal do the same but to the file modal
export const FeedModal = ({visible, setModalOptions, setFloatin, setFileModal}) => {

    //the timeout1 holds a timeout function that will hide the shadow background of the modal
    //this was necessary because you could go to another page from this modal and the shadow element 
    //wouldnt exist to be setted of
    let timeout1;

    //here we use the useNavigate hook to go to profile and login page when the users logout
    let navigate = useNavigate();

    //every time the component is unmounted if the shadow no longer exists (user went to other page)
    //then we clear the timeout that will set it of
    useEffect(() => {
    
        return () => {
            if(!document.getElementsByClassName('shadow')[0]?.style || !document.getElementsByClassName('floatinBtn')[0]?.style){
                clearTimeout(timeout1);
            }
            
        }
    });


    return (
        //the shadow takes all the screen to prevent user clicking where it shouldnt
        //when clicked it sets the modal to hidden and the float button to be shown
        //also a timeout is created to set the shadow off 100 ms after
        //this is necessary so the animation of the modal hiding dont get cut
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
                {/*this is the add image option, sets the file modal to be shown*/}
                <motion.p 
                    onClick={() => {
                        setFileModal("visible");
                        document.getElementsByClassName('shadow1')[0].style.display = 'block';
                    }} 
                    whileHover={{scale: 1.1}}
                >Add Image
                </motion.p>

                {/*this is the profile option and redirects the user to the profile page*/}
                <Link to="/profile"><motion.p whileHover={{scale: 1.1}}>Profile</motion.p></Link>

                {/* this gets the user logged out */}
                <motion.p whileHover={{scale: 1.1}} onClick={() => {auth.signOut(); navigate("/")}}>Logout</motion.p>
            </motion.div>
        </div>
        
    );
}