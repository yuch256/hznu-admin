import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';
// import axios from 'axios';

import BasicLayout from './layouts/BasicLayout';
import UnauthorizedLayout from './layouts/UnauthorizedLayout';

class App extends React.Component {
  componentDidMount() {
    // axios.defaults.baseURL = 'http://localhost:3001';
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" exact component={UnauthorizedLayout} />
          <Route path="/" component={BasicLayout} />
          <Redirect to="/login" />
        </Switch>
      </Router>
    );
  }
}

export default App;

// 路由参阅：https://css-tricks.com/react-router-4/
