import React from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Foot from './components/Footer';
import Head from './components/Header';
import Notification from './containers/Notification';
import NotFound from './components/NotFound';
import Instructions from './containers/Instructions';
import Board from './containers/Board';
import Boards from './containers/Boards';
import Thread from './containers/Thread';

import { Provider } from 'react-redux';

import configureStore from './store';
const store = configureStore();

const { Content } = Layout;

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Notification />
        <Layout style={{ background: 'transparent' }}>
          <Head />
          <Content style={{ padding: '0 50px' }}>
            <div className='content'>
              <Switch>
                <Route exact path='/'>
                  <Instructions />
                </Route>
                <Route exact path='/b/:board'>
                  <Board />
                </Route>
                <Route exact path='/b/:board/:thread_id'>
                  <Thread />
                </Route>
                <Route exact path='/boards'>
                  <Boards />
                </Route>
                <Route exact path='/not-found'>
                  <NotFound />
                </Route>
              </Switch>
            </div>
          </Content>
          <Foot />
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
