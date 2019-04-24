import React from 'react';
import { connect } from 'react-redux';

import { loaddata } from './service';
import * as styles from './style.less';

class A extends React.Component {
  componentDidMount() {

  }
  render() {
    return (
      <div className={styles['carousel-wrap']}>
        <i />
        <div className={styles.hot} />
        { this.props.todos[0] }
        <br />
        { this.props.todos[1] }
      </div>
    );
  }
}

export default connect(state => ({
  todos: state.pagesProductA,
}))(A);
