import React from 'react';

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

export default Button;