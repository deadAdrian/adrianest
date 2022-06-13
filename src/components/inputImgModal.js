import React, {useState} from 'react';
import {motion} from 'framer-motion';
import '../pageStyles/inputImgModal.scss';

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

export const InputImgModal = ({visible, setFileModal}) => {
    const [file, setFile] = useState("");

    const handleInputChange = (e) => {
        setFile(e.target.value);
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
                setFile("");
        }}>
            <motion.div 
                onClick={(e) => {e.stopPropagation();}}
                className="inputImgModal"
                variants={fileModalVariants}
                initial="hidden"
                animate={visible}
            >
                <div className="labelDiv">
                    <label htmlFor="inputFile">Select your file</label>
                    {file !== "" && 
                        <motion.i 
                            className='bx bx-check'
                            variants={iconVariants}
                            initial="hidden"
                            animate="visible"
                        >
                        </motion.i>
                    }
                </div>
                
                <input onChange={handleInputChange} id="inputFile" type="file" accept="image/png, image/jpeg" required/>
                <button>Upload</button>
            </motion.div>
        </div>
        
    );
}