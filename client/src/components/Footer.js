import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

function Foot() {
  return (
    <Footer style={{ textAlign: 'center' }}>
      Made with{' '}
      <span role='img' aria-label='love'>
        ❤️
      </span>{' '}
      by{' '}
      <a href='https://abhineet.me' target='_blank' rel='noopener noreferrer'>
        @abe312
      </a>
    </Footer>
  );
}

export default Foot;
