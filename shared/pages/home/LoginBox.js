import React from 'react';

import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { login } from './service';
import * as style from './style.less';

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
    this.submit = this.submit.bind(this);
  }

  openLoading() {
    this.setState({
      loading: true,
    });
  }

  closeLoading(cb) {
    this.setState({
      loading: false,
    }, () => cb && cb());
  }

  async submit() {
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

    this.openLoading();

    try {
      const res = await login({ name, email });
      this.closeLoading(() => {
        if (res && res.data && res.data.success) {
          const { onSuccess } = this.props;
          onSuccess && onSuccess();
        } else {
          this.setState({
            error: {
              responseError: 'system error'
            }
          });
        }
      });
    } catch (e) {
      this.closeLoading(() => {
        if (e.response) {
          this.setState({
            error: {
              responseError: e.response.data.errorMsg.errorMessage
            }
          });
        } else {
          this.setState({
            error: {
              responseError: 'system error'
            }
          });
        }
      });
    }
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
          <Button onClick={this.submit} loading={loading}>Send</Button>
        </div>
        <p className={style.errorBox}>{error.responseError}</p>
      </div>
    );
  }
}

export default LoginBox;
