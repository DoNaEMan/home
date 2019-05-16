import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as styles from './style.less';

class A extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <h1 className={styles.apple}>Hello App</h1>
        <Link to="/productA/index"><button>A</button></Link>
        <Link to="/productB/index"><button>B</button></Link>
        <div className={styles['carousel-wrap']}>
          <i />
          <div className={styles.hot} />
          { this.props.todos[0] }
          <br />
          { this.props.todos[1] }
        </div>
        <img src="/head.jpg" />
      </div>
    );
  }
}

export default connect(state => ({
  todos: state.pagesProductA,
}))(A);
