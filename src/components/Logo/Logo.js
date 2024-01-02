import React from "react";
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import logo from './logo.png';

const Logo = () => {
    return (
        <div className='ma5 mt0'>
            <Tilt options={{max: 55}} className="Tilt br2" style={{height: '150px', width: '350px'}}>
                <div className="Tilt-inner pa3">
                    <img style={{paddingTop: '5px'}} alt='logo' src={logo} />
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;