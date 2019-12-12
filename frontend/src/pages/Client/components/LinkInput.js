import React from 'react';

import './styles/LinkInput.scss';

import linkImg from '../../../assets/static/link.png';

const LinkInput = () => {
  return (
    <div className='input'>
      <input type='text' className='input__field' placeholder='Paste Link' />
      <span className='icon'>
        <img src={linkImg} alt='send' />
      </span>
    </div>
  );
};

export default LinkInput;
