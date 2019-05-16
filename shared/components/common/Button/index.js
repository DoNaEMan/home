import React from 'react';

import * as style from './style.less';

const Button = ({ children, className, ...rest }) => {
  return (
    <button {...rest} className={`${style.button} ${className}`}>{ children }</button>
  );
};

export default Button;