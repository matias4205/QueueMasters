import React from 'react';

import './styles/CircularButton.scss';

const CircularButton = ({ img, classes, alt, handler }) => {
  return (
    <button
      className={`circular-button ${[...classes]}`}
      onClick={handler}
      type='button'
    >
      <img src={img} alt={alt} />
    </button>
  );
};

export default CircularButton;
