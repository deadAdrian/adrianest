import React, {useState, useEffect} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import { Header } from '../components/header';
import {ImgCard} from '../components/imgCard';
import {FloatinBtn} from '../components/floatinBtn';
import {FeedModal} from '../components/feedModal';
import {InputImgModal} from '../components/inputImgModal';
import {ImgInfoModal} from '../components/imgInfoModal';
import '../pageStyles/feed.scss';
import uniqid from 'uniqid';
import {auth, catchImgs } from '../components/firebaseStuff';


export const Feed = (props) => {
    const [initFeed, setInitFeed] = useState(true);
    const [floatin, setFloatin] = useState("visible");
    const [modalOptions, setModalOptions] = useState('hidden');
    const [liked, setLike] = useState(true);
    const [title, setTitle] = useState("Hands on fire");
    const [imgInfoModal, setImgInfoModal] = useState("hidden");
    const [fileModal, setFileModal] = useState("hidden");
    let navigate = useNavigate();
    let timeout2;
    useEffect(() => {
        catchImgs(props.setImgs, setInitFeed);
        
    }, []);

    const toogleLike = () => {
        if(liked){
            setLike(false);
        }else{
            setLike(true);
        }
    }

    const manageImgInfoModal = () => {
        //do stuff and set imgInfoModal visible
        document.getElementsByClassName('shadow3')[0].style.display = 'block';
        setImgInfoModal("visible");
    }

    if(props.init && auth.currentUser){
        clearTimeout(timeout2);
        return null;
        
        
    }else if(!props.init && auth.currentUser){
        
        return (
            <div className='feed'>
                <FloatinBtn floatin={floatin}  setFloatin={setFloatin} setModalOptions={setModalOptions}/>
                <FeedModal visible={modalOptions} setFileModal={setFileModal} setModalOptions={setModalOptions} setFloatin={setFloatin} />
                <Header logged={props.logged} userPic={props.userPic} username={props.username} homepage={false} feed={true}/>
                <InputImgModal visible={fileModal} setLoginModal={props.setLoginModal} setImgs={props.setImgs} setInitFeed={setInitFeed} setFileModal={setFileModal}/>
                <ImgInfoModal liked={liked} setImgInfoModal={setImgInfoModal} visible={imgInfoModal} toogleLike={toogleLike} title={title}/>
            
            <div className="feedImageDiv">
                
         
            {!initFeed &&
                props.imgs.map((src) => {
                    
                    return <ImgCard manageImgInfoModal={manageImgInfoModal}  key={uniqid()} src={src}/>
                })
            }
                
            </div>

                {
                    initFeed &&
                    <div className="spinnerFeed">
                        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    </div>
                }
                
            </div>
        ); 
    }else{
        
        timeout2 = setTimeout(() => {
            if(!auth.currentUser){
                navigate("/");
            }
        } , 3000);
        
    }
     
    
}