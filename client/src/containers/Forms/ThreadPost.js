import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Icon, Input, Button } from 'antd';
// import { Field, reduxForm } from 'redux-form';

import { connect } from 'react-redux';
import { postThread, getThread } from '../../store/actions';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ThreadPost extends Component {
  state = {
    loading: false,
    // board: '',
    // text: '',
    // delete_password: '',
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
    // let form = {};
    // const { board, text, delete_password } = this.state;
    // form.board = board;
    // form.text = text;
    // form.delete_password = delete_password;

    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        // this.props.postThread(form);
        let form = {};
        const { board, text, password } = values;
        form.board = board;
        form.text = text;
        form.delete_password = password;
        console.log(form);
        this.props.postThread(form);
        this.props.getThread({ board });
        this.props.history.push(`/b/${board}`);
      }
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
    } = this.props.form;

    // Only show error after a field is touched.
    const boardError = isFieldTouched('board') && getFieldError('board');
    const textError = isFieldTouched('text') && getFieldError('text');
    const passwordError =
      isFieldTouched('password') && getFieldError('password');
    return (
      <Form
        onSubmit={this.handleSubmit}
        style={{ width: '50%', maxWidth: 300, margin: 'auto' }}
      >
        {/* <input type='text' name='board' onChange={this.handleChange} /> */}
        <Form.Item
          validateStatus={boardError ? 'error' : ''}
          help={boardError || ''}
        >
          {getFieldDecorator('board', {
            rules: [
              { required: true, message: 'Please input board name' },
              {
                pattern: new RegExp('^[A-Za-z0-9_-]*$'),
                message: 'no spaces or special characters allowed!',
              },
            ],
          })(
            <Input
              prefix={
                <Icon
                  type='book'
                  style={{ color: 'rgba(0, 0, 0, 0.75' }}
                  theme='filled'
                />
              }
              placeholder='Board'
            />
          )}
        </Form.Item>

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

        {/* <input type='text' name='text' onChange={this.handleChange} /> */}
        {/* <input
          type='text'
          name='delete_password'
          onChange={this.handleChange}
        /> */}
        {/* <button type='submit'>Submit</button> */}
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            disabled={hasErrors(getFieldsError())}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = null;
const mapDispatchToProps = dispatch => ({
  postThread: form => dispatch(postThread(form)),
  getThread: form => dispatch(getThread(form)), // bug that Board doesn't run componentDidMount when called from here
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create({ name: 'thread_post' })(withRouter(ThreadPost)));

// const validate = values => {
//   const errors = {};
//   if (!values.board) {
//     errors.board = 'Required';
//   }
//   if (!values.text) {
//     errors.text = 'Required';
//   }
//   if (!values.delete_password) {
//     errors.delete_password = 'Required';
//   }
//   return errors;
// };

// export default reduxForm({
//   form: 'simple',
//   validate,
// })(ThreadPost);
