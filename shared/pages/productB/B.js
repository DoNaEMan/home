import React from 'react';
import { connect } from 'react-redux';

import * as styles from './style.scss';

class B extends React.Component {
  counter() {
    this.props.dispatch({
      type: 'DECREMENT',
    });
  }

  render() {
    return (
      <div className={styles['carousel-wrap']} onClick={() => this.counter()}>
        <i />
        {this.props.counter}
      </div>
    );
  }
}

export default connect(state => ({
  counter: state.pagesProductB,
}))(B);
