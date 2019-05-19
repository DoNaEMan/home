import React from 'react';

import * as style from './style.less';

const Input = ({ className, disabled, name, onChange, error, ...rest }) => {
  return (
    <input
      {...rest}
      className={`${style.input} ${className || ''} ${disabled ? style.disabled : ''} ${ error ? style.error : '' }`}
      disabled={disabled}
      name={name}
      onChange={(e) => onChange(name, e.target.value)}
    />
  );
};

export default Input;