import React, { Component } from 'react';
import { Form, Icon, Button } from 'antd';

import { connect } from 'react-redux';
import { putReply } from '../../store/actions';

class ReportReply extends Component {
  state = {
    loading: false,
    disabled: false,
    iconLoading: false,
  };
  handleSubmit = e => {
    e.preventDefault();
    const { board, thread_id, reply_id } = this.props;
    const form = { board, thread_id, reply_id };
    console.log('reporting reply');
    this.props.putReply(form);
    setTimeout(() => {
      this.setState({ loading: false, disabled: true, iconLoading: false });
    }, 1000);
  };

  enterIconLoading = () => {
    this.setState({ iconLoading: true });
  };

  render() {
    return (
      <Form layout='inline' onSubmit={this.handleSubmit}>
        <Form.Item>
          <Button
            type='danger'
            ghost
            icon='exclamation-circle'
            loading={this.state.iconLoading}
            onClick={this.enterIconLoading}
            disabled={this.state.disabled}
            htmlType='submit'
            className='report-reply-button'
            size='small'
          >
            Report
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  putReply: form => dispatch(putReply(form)),
});

export default connect(null, mapDispatchToProps)(ReportReply);
