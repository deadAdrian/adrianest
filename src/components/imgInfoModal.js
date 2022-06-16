import React, {useState} from 'react';
import {motion} from 'framer-motion';
import '../pageStyles/imgInfoModal.scss';

const imgInfoModalVariants = {
    hidden: {
        x: '100vw',
    },
    visible:{
        x: 0,
    }
}

const iconVariants = {
    hidden: {
        scale: 0
    },
    visible:{
        scale: 1
    }
}

export const ImgInfoModal = ({likes, imgName, imgSrc, liked, toogleLike, title, visible, setImgInfoModal}) => {
    

    return (
        <div 
            className='shadow3' 
            onClick={() => {
                setImgInfoModal("hidden"); 
                setTimeout(() => {document.getElementsByClassName('shadow3')[0].style.display = 'none';}, 100);
            }}
        >
            <motion.div 
                onClick={(e)=>{e.stopPropagation()}}
                variants={imgInfoModalVariants}
                initial="hidden"
                animate={visible}
                className="imgInfoModal" 
            >
                
                <div className="imageAndTitle">
                    <h2>{title}</h2>
                    <div className="imgContainer">
                        <img src={imgSrc}/>
                    </div>
                    
                </div>
                
                <div className="commentsContainer">
                    <h2>Comments</h2>
                    <div className="likeAndInput">
                        {liked && 
                            <motion.i 
                                id="liked" 
                                onClick={() => {
                                    toogleLike(imgName);
                                }}
                                className='bx bxs-heart'
                                variants={iconVariants}
                                initial="hidden"
                                animate="visible"
                            >
                            </motion.i>
                        }
                        {!liked &&
                            <motion.i  
                                id="unliked" 
                                onClick={() => {
                                    toogleLike(imgName);
                                }}
                                className='bx bx-heart'
                                variants={iconVariants}
                                initial="hidden"
                                animate="visible" 
                            >
                            </motion.i>
                        }
                        <p className="likes">{likes}</p>
                        <input type="text" maxLength="100"/>
                        <i className='bx bxs-send'></i>
                    </div>
                    <div className="comments">
                        <p>dasdsad</p>
                        <p>dasdsad</p>
                        <p>dasdsad</p>
                        <p>dasdsad</p>
                        <p>dasdsad</p>
                        <p>dasdsad</p>
                        <p>dasdsad</p>
                        <p>dasdsad</p>
                        <p>dasdsad</p>
                        <p>dasdsad</p>
                        <p>dasdsad</p>
                        <p>dasdsad</p>
                    </div>
                </div>
            </motion.div>
        </div>
        
    );
}