import React, {useState, useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import { Header } from '../components/header';
import {ImgCard} from '../components/imgCard';
import {FloatinBtn} from '../components/floatinBtn';
import {FeedModal} from '../components/feedModal';
import '../pageStyles/feed.scss';
import uniqid from 'uniqid';
import { catchImgs } from '../components/firebaseStuff';

export const Feed = (props) => {
    const [initFeed, setInitFeed] = useState(true);
    const [floatin, setFloatin] = useState("visible");
    const [modalOptions, setModalOptions] = useState('hidden');

    useEffect(() => {
        catchImgs(props.setImgs, setInitFeed);
        
    }, []);

    if(props.init && props.logged){
        return null;
    }else if(!props.init && props.logged){
        return (
            <div className='feed'>
                <FloatinBtn floatin={floatin} setFloatin={setFloatin} setModalOptions={setModalOptions}/>
                <FeedModal visible={modalOptions} setModalOptions={setModalOptions} setFloatin={setFloatin} />
                <Header logged={props.logged} user={props.user} homepage={false} feed={true}/>
                
                
            
            <div className="feedImageDiv">
                
         
            {!initFeed &&
                props.imgs.map((src) => {
                    
                    return <ImgCard  key={uniqid()} src={src}/>
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
    }else if(!props.init && !props.logged){
        return <Navigate to="/" replace /> 
    }
     
    
}