import React, {useState} from 'react';
import {motion} from 'framer-motion';
import '../pageStyles/inputImgModal.scss';
import {uploadImg} from './firebaseStuff';

const fileModalVariants = {
    hidden: {
        x: '100vw',
    },
    visible:{
        x: 0,
    }
}

const iconVariants = {
    hidden: {
        scale: 0,
    },

    visible: {
        scale: 1,
        transition: {
            delay: 1
        }
    }
}

export const InputImgModal = ({visible, setFileModal, setInitFeed, setImgs, setLoginModal}) => {
    const [fileName, setFileName] = useState("");
    const [file, setFile] = useState("");
    const [title, setTitle] = useState("");

    const handleInputChange = (e) => {
        setFileName(e.target.value.replace('C:\\fakepath\\', ''));
        setFile(e.target.files[0]);
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const hideFileModal = () => {
        setFileModal("hidden");
    }

    return(
        <div 
            className="shadow1" 
            onClick={(e) => {
                
                hideFileModal();
                setTimeout(() => {document.getElementsByClassName('shadow1')[0].style.display = 'none';}, 100);
                setFileName("");
                setFile("");
                setTitle("");
        }}>
            <motion.div 
                
                className="inputImgModal"
                variants={fileModalVariants}
                initial="hidden"
                animate={visible}
            >
                <div onClick={(e) => {e.stopPropagation();}}  className="imgsInputsDiv">
                    <div className="labelDiv">
                        <label  htmlFor="inputFile">Select your file</label>
                        
                        <input  onChange={handleInputChange} id="inputFile" type="file" accept="image/*" required/>
                    </div>
                    
                    <input onChange={handleTitleChange} placeholder='give your image a title' value={title} type="text"/>
                    
                </div>

                {fileName !== "" && title !== "" &&
                            <motion.i 
                                className='bx bx-check checaImg'
                                variants={iconVariants}
                                initial="hidden"
                                animate="visible"
                            >
                            </motion.i>
                }
                <button onClick={(e) => {
                    if(file !== "" && title !== ""){
                        setInitFeed(true);
                        uploadImg(file, title, fileName, setInitFeed, setImgs, setLoginModal);
                        
                    }else{
                        e.stopPropagation();
                        setLoginModal({color: "red", message: "You need to upload a file and give it a title before that", visible: "visible"});
                        setTimeout(() => {setLoginModal({color: "red", message: "You need to upload a file and give it a title before that", visible: "hidden"});}, 2000);
                    }
                }}>Upload</button>
            </motion.div>
        </div>
        
    );
}