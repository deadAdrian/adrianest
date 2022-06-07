import React, {useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import { Header } from '../components/header';
import {ImgCard} from '../components/imgCard';
import '../pageStyles/feed.scss';
import uniqid from 'uniqid';
import { catchImgs } from '../components/firebaseStuff';

export const Feed = (props) => {

    useEffect(() => {
        catchImgs(props.setImgs)
    }, []);

    if(props.init && props.logged){
        return null;
    }else if(!props.init && props.logged){
        return (
            <div className='feed'>
                <Header logged={props.logged} user={props.user} homepage={false} feed={true}/>
                <div className="feedImageDiv">
                    {props.imgs &&
                        
                        props.imgs.map((src) => {
                            return <ImgCard  key={uniqid()} src={src}/>
                        })
                    }
                        
                </div>
            </div>
        ); 
    }else if(!props.init && !props.logged){
        return <Navigate to="/" replace /> 
    }
    
    
    
    
}