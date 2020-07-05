import React from 'react';

import './style.scss';

const TextField = (props) => {
  const label = props.label || '';
  const inputProps = {
    type: props.type || 'text',
    value: props.value,
    placeholder: props.placeholder || '',
    onChange: props.onChange,
    name: props.name || {},
    className: `${props.inputClass || ''} ${(props.error && props.error.length > 0) ? 'has-error' : ''}`
  };
  return (
    <div className='text-field'>
      {label.length > 0 && <label>{props.label}</label>}
      <div className='input-container'>
        <input {...inputProps} />
        {
          props.error.length > 0 && (
            <div className={`error-message ${props.errorClass || ''}`}>
              {props.error}
            </div>
          )
        }
      </div>
    </div>
  );
};

export default TextField;