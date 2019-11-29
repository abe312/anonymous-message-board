import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card } from 'antd';
import Moment from 'react-moment';
import './Thread.css';

import ReportThread from './Forms/ReportThread';
import DeleteThread from './Forms/DeleteThread';
import ReportReply from './Forms/ReportReply';
import DeleteReply from './Forms/DeleteReply';
import PostReply from './Forms/PostReply';

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
    const { errors } = nextProps;
    if (errors) {
      this.props.history.push('/not-found');
    }
    if (nextProps.thread.thread) {
      const { _id, board, text, created_on, replies } = nextProps.thread.thread;

      this.setState({
        id: _id,
        board,
        text,
        created_on: new Date(created_on),
        replies,
      });
    }
  }
  render() {
    // console.log(this.props, thread);

    // console.log(this.props);
    const { id, board, text, created_on, replies } = this.state;

    let b = board && (
      <>
        <div className='board'>
          <Card
            title={`Board: ${board.toUpperCase()}`}
            extra={
              <>
                <Moment format='YYYY/MM/DD'>{created_on}</Moment>
                <br />
                <span>Id: {id}</span>
              </>
            }
            style={{ width: '100%' }}
          >
            <p>{text}</p>

            <div className='report__board'>
              <ReportThread thread_id={id} board={board} />
            </div>
            <div className='delete__board'>
              <DeleteThread thread_id={id} board={board} />
            </div>
          </Card>
        </div>
        <Card title={'Reply to Thread'}>
          <PostReply board={board} thread_id={id} />
        </Card>
      </>
    );
    let r =
      replies &&
      replies.reverse().map(reply => (
        <div style={{ marginTop: 10 }} key={reply._id}>
          <Card
            title={`Reply Id: ${reply._id}`}
            extra={
              <>
                <Moment format='YYYY/MM/DD'>{created_on}</Moment>
              </>
            }
          >
            <p>{reply.text}</p>

            <div className='report__reply'>
              <ReportReply board={board} thread_id={id} reply_id={reply._id} />
            </div>
            <div className='delete__reply'>
              <DeleteReply thread_id={id} board={board} reply_id={reply._id} />
            </div>
          </Card>
        </div>
      ));

    return (
      <>
        {b}

        {r}
      </>
    );
  }
}

const mapStateToProps = ({ thread, errors }) => ({
  thread,
  errors,
});
const mapDispatchToProps = dispatch => ({
  getThread: form => dispatch(getThread(form)),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Thread));
