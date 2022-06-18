import React, {useState, useEffect} from 'react';
import {getUsername} from './firebaseStuff';
import uniqid from 'uniqid';
import '../pageStyles/comment.scss';


//Component referent to a comment on a image info modal
export const Comment = ({commentInfo}) => {

    //this saves the user info (picture and username)
    const[picAndUsername, setPicAndUsername] = useState({});

    useEffect(() => {
        //here we wait the fetch of the user info every time the comment is loaded
        const awaiter = async() => {
            const userInfo = await getUsername(commentInfo.email); 
            setPicAndUsername(userInfo);
        }
        awaiter();
        
    }, []);

    //not much here, just plain html
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
