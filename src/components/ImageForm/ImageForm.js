import React from 'react';
import './ImageForm.css';


const ImageForm = ({onChange, onButtonSubmit}) => {
  return (
    <div>
      <p className='f3'>{'Wanna detect faces in an image? Enter an image URL.'}</p>
      <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
          <input onChange={onChange} className="f4 pa2 w-70 center" type="text" />
          <button onClick={onButtonSubmit} className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple">Detect</button>
        </div>
      </div>
    </div>
  );
}
export default ImageForm;