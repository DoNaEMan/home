import React from 'react';

import * as style from './style.less';

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.center}>
        <p>Made with <span>❤</span>️ in Melbourne.</p>
        <p>© 2019 Broccoli & Co. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;