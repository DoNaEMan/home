import React from 'react';

import * as style from './style.less';

const Content = ({ children }) => {
  return (
    <div className={style.content}>
      { children }
    </div>
  );
};

export default Content;