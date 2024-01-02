import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
const Navigation = ({ onRouteChange, isSignedIn }) => {
        if (isSignedIn) {
            return (
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick={() => onRouteChange('signout')} className='f5 link dim pa3 pointer'><FontAwesomeIcon icon={ faRightFromBracket } /> Sign out</p>
                </nav>
            );
        } else {
            return (
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick={() => onRouteChange('signin')} className='f5 link dim pa3 pointer'><FontAwesomeIcon icon={ faRightToBracket } /> Log in</p>
                    <p onClick={() => onRouteChange('register')} className='f5 link dim pa3 pointer'>Sign up</p>
                </nav>
            );
        }
}

export default Navigation;