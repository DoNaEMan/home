import React from 'react';
import axios from 'axios';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Content from '../../components/Content';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
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
    this.showLoginSuccess();
  }

  showLoginSuccess() {
    this.setState({
      showLoginSuccessBox: true,
    });
    this.hiddenLoginBox();
  }

  hiddenLoginSuccess() {
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
              <Modal close={() => this.hiddenLoginBox()}>
                <LoginBox onSuccess={() => this.loginSuccess()} />
              </Modal>
            )
          }
          {
            showLoginSuccessBox && (
              <Modal close={() => this.hiddenLoginSuccess()}>
                <LoginSuccess close={() => this.hiddenLoginSuccess()} />
              </Modal>
            )
          }
        </Content>
        <Footer />
      </div>
    );
  }
}

// login
class LoginBox extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      sendTouched: false, // 点过send按钮后开启实时校验
      error: {
        name: '',
        email: '',
        email2: '',
        responseError: '',
      },
      values: {},
    };
    this.onChange = this.onChange.bind(this);
  }

  submit() {
    const { values: { name, email }, error } = this.state;

    this.setState({
      sendTouched: true,
      error: {
        ...error,
        responseError: '',
      }
    });

    const err = this.validator();
    if (err._illegal) return;

    this.setState({
      loading: true,
    });

    axios.post('/api/login', {
      name,
      email,
    }).then((res) => {
      if (res && res.data && res.data.success) {
        const { onSuccess } = this.props;
        onSuccess && onSuccess();
      }
    }).catch((error) => {
      if (error.response) {
        this.setState({
          error: {
            responseError: error.response.data.errorMsg.errorMessage
          }
        });
      }
    }).finally(() => {
      this.setState({
        loading: false,
      });
    });
  }

  onChange(name, value = '') {
    const { values, sendTouched } = this.state;
    this.setState({
      values: {
        ...values,
        [name]: value.trim(),
      },
    }, () => {
      if (sendTouched) {
        this.validator();
      }
    });
  }

  validator() {
    const { values } = this.state;
    const err = {};

    if (!values.name) {
      err.name = 'Full name is required';
    } else if (values.name.length < 3) {
      err.name = 'Full name needs to be at least 3 characters long';
    } else {
      err.name = '';
    }

    if (!values.email) {
      err.email = 'Email is required';
    } else if (!/\w+@[a-z0-9]+\.[a-z]{2,4}/.test(values.email)) {
      err.email = 'Email format is wrong';
    } else {
      err.email = '';
    }

    if (!values.email2) {
      err.email2 = 'Confirm email is required';
    } else if (!/\w+@[a-z0-9]+\.[a-z]{2,4}/.test(values.email2)) {
      err.email2 = 'Confirm email format is wrong';
    } else if (values.email2 !== values.email) {
      err.email2 = 'Confirm email is not equal to Email';
    } else {
      err.email2 = '';
    }

    err._illegal = Object.keys(err).some(key => !!err[key]);

    this.setState({
      error: err,
    });

    return err;
  }

  render() {
    const { loading, error = {} } = this.state;
    return (
          <div className={style.login}>
              <p className={style.title}>Request an invite</p>
              <div className={style.hr} />
              <div className={style.formItem}>
                  <Input
                    type="text"
                    placeholder="Full name"
                    name="name"
                    error={error.name}
                    onChange={this.onChange}
                  />
              </div>
              <div className={style.formItem}>
                  <Input
                    type="email"
                    placeholder="Email"
                    name="email"
                    error={error.email}
                    onChange={this.onChange}
                  />
              </div>
              <div className={style.formItem}>
                  <Input
                    type="email"
                    placeholder="Confirm email"
                    name="email2"
                    error={error.email2}
                    onChange={this.onChange}
                  />
              </div>
              <div className={`${style.formItem} ${style.button}`}>
                  <Button onClick={() => this.submit()} loading={loading}>Send</Button>
              </div>
              <p className={style.errorBox}>{error.responseError}</p>
          </div>
    );
  }
}

// login success
const LoginSuccess = ({ close }) => {
  return (
    <div className={style.loginSuccess}>
      <p className={style.title}>All done!</p>
      <div className={style.hr} />
      <p>You will be one of the first to experience Broccoli & Co. when we launch</p>
      <div className={`${style.button}`}>
        <Button onClick={close}>Ok</Button>
      </div>
    </div>
  );
};

export default Home;
