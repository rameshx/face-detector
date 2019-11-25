import React from 'react';


const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (!isSignedIn) {
        return (
            <nav style={{display:'flex',justifyContent:'flex-end'}}>
                <p onClick={() => onRouteChange('signin')} className="pa3 f3 link dim black pointer underline">Sign In</p>
                <p onClick={() => onRouteChange('register')} className="pa3 f3 link dim black pointer underline">Register</p>
            </nav>
        );     
    } else {
        return (
            <nav style={{display:'flex',justifyContent:'flex-end'}}>
                <p onClick={() => onRouteChange('signin')} className="pa3 f3 link dim black pointer underline">Sign Out</p>
            </nav>
        ); 
    }
}
export default Navigation;