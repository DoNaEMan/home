import React from 'react';
import ReactDOM from 'react-dom';

import * as style from './style.less';

class Modal extends React.Component {
  constructor() {
    super();
    this.state = {
      div: null,
    };
    if (typeof window === 'object') {
      this.state.div = document.createElement('div');
    }
  }

  componentDidMount() {
    if (typeof window === 'object') {
      document.body.appendChild(this.state.div);
    }
  }

  componentWillUnmount() {
    if (typeof window === 'object') {
      document.body.removeChild(this.state.div);
    }
  }

  render() {
    const { div } = this.state;
    if (!div) return null;
    const { onCancel } = this.props;
    return (
      ReactDOM.createPortal(
        <div className={style.maskBox}>
          <div className={style.mask} onClick={onCancel} />
          {this.props.children}
        </div>,
        div
      )
    );
  }
}

export default Modal;
