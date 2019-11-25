import React from 'react';
import Tilt from 'react-tilt';
import face from './facial-recognition.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt className="Tilt shadow-2 br2" options={{ max: 55 }} style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner"><img alt="logo" src={face}/></div>
      </Tilt>
    </div>
  );
}
export default Logo;