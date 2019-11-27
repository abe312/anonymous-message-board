import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { getThread } from '../store/actions';
import { connect } from 'react-redux';

class Board extends Component {
  componentDidMount() {
    const { board } = this.props.match.params;
    let form = { board };
    this.props.getThread(form);
  }
  render() {
    const { board } = this.props.match.params;
    console.log(this.props);
    return <div>{board}</div>;
  }
}

const mapStateToProps = null;
const mapDispatchToProps = dispatch => ({
  getThread: form => dispatch(getThread(form)),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Board));
