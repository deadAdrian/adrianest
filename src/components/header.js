import React from "react";
import {Link} from 'react-router-dom';
import '../pageStyles/myHeader.scss';

export const Header = () => {

    return (
        <div className="myHeader">
            <Link to="/"><img src={`${process.env.PUBLIC_URL}/assets/imgs/logo.png`}/></Link>
        </div>
    );
}
