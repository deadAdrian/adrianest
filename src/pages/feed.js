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
import {auth, catchImgs, getImgData, likeOrDeslike } from '../components/firebaseStuff';


export const Feed = (props) => {

    //awaits for the fetch of the downloadUrls of the feed image
    const [initFeed, setInitFeed] = useState(true);

    //Sets the float button visible or not
    const [floatin, setFloatin] = useState("visible");

    //Sets the options modal visible or not
    const [modalOptions, setModalOptions] = useState('hidden');

    //Sets the info of the clicked image that will appear on the image modal when a image is clicked
    const [liked, setLiked] = useState("");
    const [likes, setLikes] = useState("");
    const [title, setTitle] = useState("");
    const [imgName, setImgName] = useState("");
    const [imgInfoModalSrc, setImgInfoModalSrc] = useState("");

    //Sets the image modal visible or not
    const [imgInfoModal, setImgInfoModal] = useState("hidden");

    //Sets the file modal visible or not
    const [fileModal, setFileModal] = useState("hidden");

    //Blocks user from spamming like button to prevent async errors
    const [canUserLike, setCanUserLike] = useState(true);

    let navigate = useNavigate();
    let timeout2;


    //Every time the feed is mounted the catchImgs is called and after all the data is fetched 
    //the feed imgs is alowed to load
    useEffect(() => {
        catchImgs(props.setImgs, setInitFeed);
        
    }, []);

    const toogleLike = (name) => {
        if(canUserLike){
            if(liked){
                setLiked(false);
            }else{
                setLiked(true);
            }
            likeOrDeslike(name, setCanUserLike, setLikes);

        }
        
    }

    const manageImgInfoModal = async (name, src) => {

        //do stuff and set imgInfoModal visible
        const imgInfo = await getImgData(name);
        setTitle(imgInfo.title);
        setLiked(imgInfo.liked);
        setLikes(imgInfo.likes);
        setImgName(imgInfo.name);
        setImgInfoModalSrc(src);
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
                <ImgInfoModal likes={likes} imgName={imgName} imgSrc={imgInfoModalSrc} liked={liked} setImgInfoModal={setImgInfoModal} visible={imgInfoModal} toogleLike={toogleLike} title={title}/>
            
            <div className="feedImageDiv">
                
         
            {!initFeed &&
                props.imgs.map((info) => {
                    
                    return <ImgCard manageImgInfoModal={manageImgInfoModal}  key={uniqid()} name={info.name} src={info.url}/>
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