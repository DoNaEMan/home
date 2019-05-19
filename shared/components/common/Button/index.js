import React from 'react';

import * as style from './style.less';

const Button = ({ children, className, loading, disabled = false, ...rest }) => {
  let originalDisabled = disabled;
  if (loading) {
    originalDisabled = true;
  }
  return (
    <button {...rest} className={`${style.button} ${className || ''} ${originalDisabled ? style.disabled : ''}`} disabled={originalDisabled}>
      { children }
      { loading && <span className={style.buttonLoading}></span> }
    </button>
  );
};

export default Button;