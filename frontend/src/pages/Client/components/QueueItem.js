import React from 'react';

const QueueItem = ({ title, index = null, active = false }) => {
  return (
    <li className={`queue__item ${index && `queue__item--${index}`} ${active && 'active'}`}>
      {title}
    </li>
  );
};

export default QueueItem;
