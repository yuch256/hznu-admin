import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';
import axios from 'axios';

import BasicLayout from './layouts/BasicLayout';
import UnauthorizedLayout from './layouts/UnauthorizedLayout';
import AuthorizedRoute from './AuthorizedRoute';

class App extends React.Component {
  state = {
    logined: false,
  };

  componentDidMount() {
    axios.defaults.baseURL = 'http://localhost:3001';

    let t = localStorage.getItem('hznu-t')
    console.log(`token: ${t}`)
    if (t) this.setState({ logined: true })
  }

  render() {
    let { logined } = this.state;
    return (
      <Router>
        <Switch>
          <Route path="/login" exact component={UnauthorizedLayout} logined={logined} />
          <AuthorizedRoute path="/" exact component={BasicLayout} logined={logined} />
          <Redirect to="/login" />
        </Switch>
      </Router>
    );
  }
}

export default App;

// 路由参阅：https://css-tricks.com/react-router-4/
