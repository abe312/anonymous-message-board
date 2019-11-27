import React, { Component } from 'react';
import { Table, Tag, Form, Input, Button, Typography } from 'antd';

import ThreadPost from './Forms/ThreadPost';

import { connect } from 'react-redux';

const { Title } = Typography;

const columns = [
  {
    title: 'Endpoints',
    dataIndex: 'API',
    key: 'API',
    render: item => <Tag color={'blue'}>{item}</Tag>,
  },
  {
    title: 'GET',
    dataIndex: 'get',
    key: 'get',
  },
  {
    title: 'POST',
    dataIndex: 'post',
    key: 'post',
  },
  {
    title: 'PUT',
    dataIndex: 'put',
    key: 'put',
  },
  {
    title: 'DELETE',
    dataIndex: 'delete',
    key: 'delete',
  },
];

const data = [
  {
    API: '/api/threads/{board}',
    get: 'list recent threads',
    post: 'create thread',
    put: 'report thread',
    delete: 'delete thread with password',
    key: '1',
  },
  {
    API: '/api/replies/{board}',
    get: 'show all replies on thread',
    post: 'create reply on thread',
    put: 'report reply on thread',
    delete: 'change reply to [deleted] on thread',
    key: '2',
  },
];

class Instructions extends Component {
  render() {
    return (
      <>
        <br />
        <Title> Anonymous Message Board </Title>
        <br />
        <Table columns={columns} dataSource={data} pagination={false} />
        <br />
        <h2>Try it yourself!</h2>
        <h3>Add new Thread (POST /api/threads/:board) </h3>
        <ThreadPost />
      </>
    );
  }
}

const mapStateToProps = null;
const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(Instructions);
