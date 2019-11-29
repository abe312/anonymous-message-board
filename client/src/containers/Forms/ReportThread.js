import React, { Component } from 'react';
import { Form, Icon, Button } from 'antd';

import { connect } from 'react-redux';
import { putThread } from '../../store/actions';

class ReportThread extends Component {
  state = {
    loading: false,
    disabled: false,
    iconLoading: false,
  };
  handleSubmit = e => {
    e.preventDefault();
    const { board, thread_id } = this.props;
    const form = { board, thread_id };
    console.log('sending');
    this.props.putThread(form);
    setTimeout(() => {
      this.setState({ loading: false, disabled: true, iconLoading: false });
    }, 1000);
  };

  enterIconLoading = () => {
    this.setState({ iconLoading: true });
  };
  // componentWillRecieveProps(nextProps){
  // if(nextProps.loading){
  //   this.setState({disabled: true, loading: false})
  // }
  // }

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
            className='report-thread-button'
          >
            Report
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  putThread: form => dispatch(putThread(form)),
});

export default connect(null, mapDispatchToProps)(ReportThread);
