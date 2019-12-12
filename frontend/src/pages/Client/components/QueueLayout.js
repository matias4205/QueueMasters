import React from 'react';

import '../styles/components/QueueLayout.scss';

const QueueLayout = ({ children }) => {
  return (
    <ul className='queue'>
      {children}
    </ul>
  );
};

export default QueueLayout;
