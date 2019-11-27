import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

function Head() {
  return (
    <>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className='logo' />
        <Menu
          theme='dark'
          mode='horizontal'
          defaultSelectedKeys={['']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key='3'>
            <Link to='/'>Instructions</Link>
          </Menu.Item>
          <Menu.Item key='1'>
            <Link to='/boards'>All Boards</Link>
          </Menu.Item>
          <Menu.Item key='2'>
            <Link to='/b/general'>General</Link>
          </Menu.Item>
        </Menu>
      </Header>
    </>
  );
}

export default Head;
