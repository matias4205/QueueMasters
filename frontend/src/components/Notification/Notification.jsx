import React, { useState, useEffect } from 'react';

import closeImg from '../../assets/static/close_white.png';

import '../styles/Notification.scss';

const TimeoutRing = (props) => {
  const { radius, stroke, progress } = props;

  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg
      height={radius * 2}
      width={radius * 2}
    >
      <circle
        stroke='white'
        fill='transparent'
        strokeWidth={stroke}
        strokeDasharray={`${circumference} ${circumference}`}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
};

const Notification = (props) => {
  const { timeout, onTimeout, text } = props;
  const [state, setState] = useState({ progress: 100 });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setState((prevState) => {
        const { progress } = prevState;

        if (progress === 0) {
          console.log('Stopping interval!', state.progress);
          clearInterval(intervalId);
          onTimeout();
        }

        return {
          progress: progress - 10,
        };
      });
    }, (timeout / 10));
  }, []);

  return (
    <div className='notification notification--success'>
      <div className='notification__container'>
        <p className='notification__text'>
          {text}
        </p>
        <div className='notification__close'>
          <button type='button' onClick={onTimeout}>
            <img src={closeImg} alt='close' />
          </button>
          <TimeoutRing radius={23} stroke={3} progress={state.progress} />
        </div>
      </div>
    </div>
  );
};

export default Notification;
