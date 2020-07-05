import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Button = (props) => {
  const buttonProps = {
    type: props.type || 'button',
    className: props.className || '',
    onClick: props.onClick
  }
  return (
    <div className='btn-container'>
      <button {...buttonProps}>{props.children}</button>
    </div>
  )
};

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;