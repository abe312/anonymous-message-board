import React, { Component } from 'react';
import { Button, notification, Icon } from 'antd';

import { connect } from 'react-redux';

class Notification extends Component {
  openNotification = () => {
    // "incorrect password" notification
    notification.open({
      message: 'Password incorrect',
      description: 'Please retry with correct password',
      icon: <Icon type='frown' style={{ color: 'rgba(252, 73, 3, 0.7)' }} />,
    });
  };
  openNotificationR = str => {
    notification.open({
      message: `${str} successfully reported!`,
      description: "Sit back. We'll have a look.",
      icon: <Icon type='meh' style={{ color: 'rgba(123, 245, 66, 0.7)' }} />,
    });
  };
  openNotificationD = str => {
    notification.open({
      message: `${str} successfully deleted!`,
      description: `We have deleted the ${str}`,
      icon: <Icon type='smile' style={{ color: 'rgba(123, 245, 66, 0.8)' }} />,
    });
  };

  componentWillReceiveProps(nextProp) {
    const { notification } = nextProp;

    if (notification) {
      // incorrect password notification
      if (notification.startsWith('incorrect password')) {
        this.openNotification();
      }
      // reply report
      if (notification.startsWith('reply report')) {
        this.openNotificationR('Reply');
      }
      // thread report
      if (notification.startsWith('thread report')) {
        this.openNotificationR('Thread');
      }
      if (notification.startsWith('reply delete')) {
        this.openNotificationD('Reply');
      }
      if (notification.startsWith('thread delete')) {
        this.openNotificationD('Thread');
      }
    }
  }
  render() {
    return <div></div>;
  }
}

const mapStateToProps = ({ notification }) => ({
  notification,
});
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
