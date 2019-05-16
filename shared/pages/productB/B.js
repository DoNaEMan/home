import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as styles from './style.less';

class B extends React.Component {
  counter() {
    this.props.dispatch({
      type: 'DECREMENT',
    });
  }

  render() {
    return (
      <div>
        <h1 className={styles.apple}>Hello App qwe</h1>
        <Link to="/productA/index"><button>A</button></Link>
        <Link to="/productB/index"><button>B</button></Link>
        <div className={styles['carousel-wrap']} onClick={() => this.counter()}>
          <i />
          {this.props.counter}
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  counter: state.pagesProductB,
}))(B);
