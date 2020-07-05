import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const TextField = (props) => {
  const label = props.label || '';
  const inputProps = {
    type: props.type || 'text',
    value: props.value,
    placeholder: props.placeholder || '',
    onChange: props.onChange,
    name: props.name || {},
    className: `${props.inputClass || ''} ${(props.error && props.error.length > 0) ? 'has-error' : ''} ${props.disabled ? 'disabled' : ''}`,
    disabled: props.disabled || false
  };

  return (
    <div className={`text-field ${props.containerClass || ''}`} >
      {label.length > 0 && <label className={props.labelClass || ''}>{props.label}</label>}
      < div className={`input-container ${props.inputContainerClass || ''}`} >
        <input {...inputProps} />
        {
          props.error.length > 0 && (
            <div className={`error-message ${props.errorClass || ''}`}>
              {props.error}
            </div>
          )
        }
      </div >
    </div >
  );
};

TextField.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  inputClass: PropTypes.string,
  labelClass: PropTypes.string,
  containerClass: PropTypes.string,
  inputContainerClass: PropTypes.string,
  onChange: PropTypes.func,
};

export default TextField;