import React from 'react';
import './FaceRecognition.css';


const FaceRecognition = ({imageUrl, box}) => {
  return (
    <div className='center'>
      <div className='absolute mt2'>
        <img id='faceRecogImg' alt='' src={imageUrl} width='500px' />
        <div className='bounding-box' style={{top: box.top, bottom: box.bottom, left: box.left, right: box.right}}></div>
      </div>
    </div>
  );
}
export default FaceRecognition;