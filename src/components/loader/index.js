import React from 'react';

import './style.scss';

const Loader = ({ title }) => {
  return (
    <div className='overlay'>
      <span>
        <div className='loader'></div>
        <div className='title'>{title || 'Loading...'}</div>
      </span>
    </div>
  );
};

export default Loader;
