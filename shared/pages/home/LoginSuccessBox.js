import React from 'react';

import Button from '../../components/common/Button';
import * as style from './style.less';

// login success
const LoginSuccessBox = ({ onCancel }) => {
  return (
    <div className={style.loginSuccess}>
      <p className={style.title}>All done!</p>
      <div className={style.hr} />
      <p>You will be one of the first to experience Broccoli & Co. when we launch</p>
      <div className={`${style.button}`}>
        <Button onClick={onCancel}>Ok</Button>
      </div>
    </div>
  );
};

export default LoginSuccessBox;
