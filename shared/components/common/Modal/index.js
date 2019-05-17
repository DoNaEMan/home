import React from 'react';
import ReactDOM from 'react-dom';

import * as style from './style.less';

class Modal extends React.Component {
    constructor() {
        super();
        if (typeof window === 'object') {
            this.div = document.createElement('div');
        }
    }
    componentDidMount() {
        document.body.appendChild(this.div);
    }
    componentWillUnmount() {
        document.body.removeChild(this.div);
    }
    render() {
        if (!this.div) return null;
        const { close = () => {} } = this.props;
        return ReactDOM.createPortal(
            <div className={style.maskBox}>
                <div className={style.mask} onClick={close} />
                {this.props.children}
            </div>
            ,
            this.div
        );
    }
}

export default Modal;
