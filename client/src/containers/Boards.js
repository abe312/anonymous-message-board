import React, { Component } from 'react';
import { Card, Typography } from 'antd';
import './Boards.css';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { getAll } from '../store/actions';
const { Title } = Typography;

class Boards extends Component {
  componentDidMount() {
    this.props.getAll();
  }

  render() {
    const { boards } = this.props.thread;
    return (
      <>
        <Title level={1}>All Boards</Title>
        <div className='cards'>
          {boards &&
            boards.map((board, i) => (
              <div key={i} className='boards'>
                <Link to={`/b/${board}`}>
                  <Card title={'Thread'}>
                    <Title level={3}>{board}</Title>
                  </Card>
                </Link>
              </div>
            ))}
        </div>
      </>
    );
  }
}
const mapStateToProps = ({ thread }) => ({
  thread,
});
const mapDispatchToProps = dispatch => ({
  getAll: () => dispatch(getAll()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Boards);
