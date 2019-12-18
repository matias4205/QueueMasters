import React, { useState, useEffect } from 'react';

import TimeoutRing from './TimeoutRing';

import closeImg from '../../assets/static/close_white.png';
import NotificationManager from './NotificationManager';

import '../styles/Notification.scss';

const Notification = (props) => {
  const { timeout } = props;
  const [state, setState] = useState({ progress: 100, visible: false, text: '', type: null });

  const hideNotification = () => {
    setState((prevState) => {
      return {
        ...prevState,
        visible: false,
      };
    });
  };

  useEffect(() => {
    NotificationManager.on('show', ({ type, text }) => {
      setState({
        type,
        text,
        visible: true,
        progress: 100,
      });

      const intervalId = setInterval(() => {
        setState((prevState) => {
          const { progress } = prevState;

          if (progress === 0) {
            clearInterval(intervalId);
            return {
              ...prevState,
              visible: false,
            };
          }

          return {
            ...prevState,
            progress: progress - 10,
          };
        });
      }, (timeout / 10));
    });
  }, []);

  const { progress, visible, text, type } = state;

  return (
    <div className={`notification notification--${type} ${!visible && 'hidden'}`}>
      <div className='notification__container'>
        <p className='notification__text'>
          {text}
        </p>
        <div className='notification__close'>
          <button type='button' onClick={hideNotification}>
            <img src={closeImg} alt='close' />
          </button>
          <TimeoutRing radius={23} stroke={3} progress={progress} />
        </div>
        <div className='notification__overlay' />
      </div>
    </div>
  );
};

export default Notification;
