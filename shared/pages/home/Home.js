import React from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Content from '../../components/Content';
import Button from '../../components/common/Button';
import * as style from './style.less';

class Home extends React.Component {
  componentDidMount() {

  }
  componentWillUnmount() {

  }
  render() {
    return (
      <div>
        <Header />
        <Content>
          <div className={style.home}>
            <p>A better way<br />to enjoy every day.</p>
            <p>Be the first to know when we launch.</p>
            <Button className={style.button}>Request an invite</Button>
          </div>
        </Content>
        <Footer />
      </div>
    );
  }
}

export default Home;
