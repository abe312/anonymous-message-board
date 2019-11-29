import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Icon, Input, Button } from 'antd';

import { connect } from 'react-redux';
import { deleteThread } from '../../store/actions';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class DeleteThread extends Component {
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { board, thread_id } = this.props;
        let form = { board, thread_id };
        form.delete_password = values.password;

        this.props.deleteThread(form, this.props.history);
        // this.props.history.push('/');
      }
    });
  };
  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
    } = this.props.form;

    // Only show error after a field is touched.
    const passwordError =
      isFieldTouched('password') && getFieldError('password');
    return (
      <Form layout='inline' onSubmit={this.handleSubmit}>
        <Form.Item
          validateStatus={passwordError ? 'error' : ''}
          help={passwordError || ''}
        >
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: 'Please enter delete password' },
              { min: 4, message: 'cannot be < 4 chars!' },
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
            type='danger'
            htmlType='submit'
            disabled={hasErrors(getFieldsError())}
          >
            Delete Form
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  deleteThread: (form, history) => dispatch(deleteThread(form, history)),
});

export default connect(
  null,
  mapDispatchToProps
)(Form.create({ name: 'thread_delete' })(withRouter(DeleteThread)));

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Form.create({ name: 'thread_post' })(withRouter(ThreadPost)));
