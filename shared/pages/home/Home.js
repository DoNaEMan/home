import React from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import * as style from './style.less';

class Home extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Header />
        <div className={style.content}>
          123
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
