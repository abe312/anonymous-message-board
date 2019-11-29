import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Typography, Card } from 'antd';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import './Board.css';

import { getThread } from '../store/actions';
import { connect } from 'react-redux';
const { Title } = Typography;
let threadElem = null;
class Board extends Component {
  componentDidMount() {
    const { board } = this.props.match.params;
    let form = { board };
    this.props.getThread(form);
  }
  // componentWillReceiveProps(nextProps) {
  //   // const { threads } = nextProps.threads;

  // }
  // componentDidUpdate(nextProps) {
  //   console.log('nextProps', nextProps);
  //   if (nextProps.location.pathname != this.props.location.pathname) {
  //     const { board } = this.props.match.params;
  //     let form = { board };
  //     this.props.getThread(form);
  //   }
  // }

  render() {
    const { board } = this.props.match.params;
    // console.log('here', this.props);
    let { threads } = this.props.thread;

    threadElem =
      threads &&
      threads.map(thread => {
        return (
          <div key={thread._id} className='cards'>
            <Link to={`/b/${board}/${thread._id}`}>
              <Card
                title={
                  <>
                    {thread._id}
                    <p className='small'>
                      Total replies: {thread.count_replies} - hidden(
                      {thread.hidden_replies})
                    </p>
                  </>
                }
                extra={
                  <>
                    <Moment format='YYYY/MM/DD'>{thread.created_on}</Moment>
                    <br />
                    <p className='report'>
                      Reports: <span>{thread.report}</span>
                    </p>
                  </>
                }
              >
                <p>{thread.text}</p>

                <div className='replies'>
                  <Title level={4}>Replies:</Title>
                  {thread.replies &&
                    thread.replies.map(reply => {
                      return (
                        <div className='reply' key={reply._id}>
                          <p>{reply.text}</p>
                        </div>
                      );
                    })}
                </div>
              </Card>
            </Link>
          </div>
        );
      });
    return (
      <>
        <Title>{board}</Title>
        {threadElem}
      </>
    );
  }
}

const mapStateToProps = ({ thread }) => ({
  thread,
});
const mapDispatchToProps = dispatch => ({
  getThread: form => dispatch(getThread(form)),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Board));
