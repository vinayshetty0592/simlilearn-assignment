import React from 'react';
import PropTypes from 'prop-types';

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

Loader.propTypes = {
  title: PropTypes.string
};

export default Loader;
