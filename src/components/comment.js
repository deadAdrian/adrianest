import React, {useState, useEffect} from 'react';
import {getUsername} from './firebaseStuff';
import uniqid from 'uniqid';
import '../pageStyles/comment.scss';



export const Comment = ({commentInfo}) => {
    const[picAndUsername, setPicAndUsername] = useState({});

    useEffect(() => {
        
        const awaiter = async() => {
            const userInfo = await getUsername(commentInfo.email); 
            setPicAndUsername(userInfo);
        }
        awaiter();
        
    }, []);

    return (
        <div className="comment" >
            <div className="imgAndUsername">
                <div className="commentImgContainer">
                    <img className="commentImg" src={`${process.env.PUBLIC_URL}/assets/profilePics/${picAndUsername.pic}`}/>
                    
                </div>
                <p>{picAndUsername.username}:</p>
            </div>
            
            <div className="commentItselfDiv">  
                <p>{commentInfo.comment}</p>
            </div>
            
        </div>
    );
};
