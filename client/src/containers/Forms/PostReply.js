import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Icon, Input, Button } from 'antd';
// import { Field, reduxForm } from 'redux-form';

import { connect } from 'react-redux';
import { postReply } from '../../store/actions';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ReplyPost extends Component {
  state = {
    loading: false,
  };

  componentDidMount() {
    this.props.form.validateFields();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.loading)
      this.setState({ ...this.state, loading: nextProps.loading });
  }
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        let form = {};
        const { board, thread_id } = this.props;
        form = { board, thread_id };

        const { text, password } = values;
        form.text = text;
        form.delete_password = password;

        console.log(form);
        this.props.postReply(form);

        setTimeout(() => {
          this.setState({ loading: false });
        }, 1000);
      }
    });
  };

  enterLoading = () => {
    this.setState({ loading: true });
  };

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
    } = this.props.form;

    // Only show error after a field is touched.
    const textError = isFieldTouched('text') && getFieldError('text');
    const passwordError =
      isFieldTouched('password') && getFieldError('password');
    return (
      <Form layout='inline' onSubmit={this.handleSubmit}>
        <Form.Item
          validateStatus={textError ? 'error' : ''}
          help={textError || ''}
        >
          {getFieldDecorator('text', {
            rules: [
              { required: true, message: 'Please enter thread text' },
              { min: 15, message: 'text cannot be less than 15 characters' },
            ],
          })(
            <Input
              prefix={
                <Icon
                  type='file-text'
                  style={{ color: 'rgba(0, 0, 0, 0.75' }}
                  theme='filled'
                />
              }
              placeholder='Text'
            />
          )}
        </Form.Item>

        <Form.Item
          validateStatus={passwordError ? 'error' : ''}
          help={passwordError || ''}
        >
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: 'Please enter delete password' },
              { min: 4, message: 'password cannot be less than 4 characters!' },
            ],
          })(
            <Input
              prefix={
                <Icon
                  type='lock'
                  style={{ color: 'rgba(0, 0, 0, 0.75' }}
                  theme='filled'
                />
              }
              type='password'
              placeholder='Password'
            />
          )}
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            ghost
            disabled={hasErrors(getFieldsError())}
            loading={this.state.loading}
            onClick={this.enterLoading}
          >
            Post Reply
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = null;
const mapDispatchToProps = dispatch => ({
  postReply: form => dispatch(postReply(form)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create({ name: 'reply_post' })(withRouter(ReplyPost)));
