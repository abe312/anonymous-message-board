import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card } from 'antd';
import Moment from 'react-moment';
import './Thread.css';

import { getThread } from '../store/actions';
import { connect } from 'react-redux';

class Thread extends Component {
  state = {
    id: '',
    board: '',
    text: '',
    created_on: '',
    replies: [],
  };
  componentDidMount() {
    const { board, thread_id } = this.props.match.params;
    let form = { board, thread_id };
    this.props.getThread(form);
  }
  componentWillReceiveProps(nextProps) {
    const { _id, board, text, created_on, replies } = nextProps.thread.thread;

    this.setState({
      id: _id,
      board,
      text,
      created_on: new Date(created_on),
      replies,
    });
  }
  render() {
    // console.log(this.props, thread);

    // console.log(this.props);
    const { id, board, text, created_on, replies } = this.state;
    return (
      <div>
        <Card
          title={`${board.toUpperCase()}`}
          extra={<Moment format='YYYY/MM/DD'>{created_on}</Moment>}
          style={{ width: '100%' }}
        >
          <p>{text}</p>

          <p className='report__board'>report board</p>
          <p className='delete__board'>delete form</p>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ thread }) => ({
  thread,
});
const mapDispatchToProps = dispatch => ({
  getThread: form => dispatch(getThread(form)),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Thread));
