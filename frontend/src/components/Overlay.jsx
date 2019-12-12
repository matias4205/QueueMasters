import React from 'react';
import ReactDOM from 'react-dom';

import './styles/Overlay.scss';

import closeImg from '../assets/static/close.png';

function Overlay({ children, isActive, onClose }) {
  if (!isActive) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className='overlay'>
      <button className='close' onClick={onClose} type='button'>
        <img src={closeImg} alt='close' />
      </button>
      {children}
    </div>,
    document.getElementById('modal'),
  );
}

export default Overlay;
