import React from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Content from '../../components/Content';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import LoginBox from './LoginBox';
import LoginSuccessBox from './LoginSuccessBox';
import * as style from './style.less';

// home page
class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      showLoginBox: false,
      showLoginSuccessBox: false,
    };
  }

  hiddenLoginBox() {
    this.setState({
      showLoginBox: false,
    });
  }

  showLoginBox() {
    this.setState({
      showLoginBox: true,
    });
  }

  loginSuccess() {
    this.showLoginSuccessBox();
  }

  showLoginSuccessBox() {
    this.hiddenLoginBox();
    this.setState({
      showLoginSuccessBox: true,
    });
  }

  hiddenLoginSuccessBox() {
    this.setState({
      showLoginSuccessBox: false,
    });
  }

  render() {
    const { showLoginBox, showLoginSuccessBox } = this.state;
    return (
      <div>
        <Header />
        <Content>
          <div className={style.home}>
            <p>A better way<br />to enjoy every day.</p>
            <p>Be the first to know when we launch.</p>
            <Button onClick={() => this.showLoginBox()} className={style.button}>Request an invite</Button>
          </div>
          {
            showLoginBox && (
              <Modal onCancel={() => this.hiddenLoginBox()}>
                <LoginBox onSuccess={() => this.loginSuccess()} />
              </Modal>
            )
          }
          {
            showLoginSuccessBox && (
              <Modal onCancel={() => this.hiddenLoginSuccessBox()}>
                <LoginSuccessBox onCancel={() => this.hiddenLoginSuccessBox()} />
              </Modal>
            )
          }
        </Content>
        <Footer />
      </div>
    );
  }
}

export default Home;
