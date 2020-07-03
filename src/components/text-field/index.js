import React from 'react';

import './style.scss';

const TextField = (props) => {
  const label = props.label || '';
  const inputProps = {
    type: props.type || 'text',
    value: props.value,
    placeholder: props.placeholder || '',
    onChange: props.onChange,
    name: props.name || {}
  };
  return (
    <div className='text-field'>
      {label.length > 0 && <label>{props.label}</label>}
      <div className='input-container'>
        <input {...inputProps} />
      </div>
    </div>
  );
};

export default TextField;