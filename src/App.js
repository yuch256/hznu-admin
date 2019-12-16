import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';
import axios from 'axios';

import BasicLayout from './layouts/BasicLayout';
import UnauthorizedLayout from './layouts/UnauthorizedLayout';
import AuthorizedRoute from './AuthorizedRoute';

class App extends React.Component {
  state = {
    logined: true,
  };

  componentDidMount() {
    axios.defaults.baseURL = 'http://localhost:3001'

    let t = localStorage.getItem('hznu-t')
    console.log(t)
    if (t) this.setState({ logined: true })
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" exact component={UnauthorizedLayout} />
          <AuthorizedRoute path="/" component={BasicLayout} logined={this.state.logined} />
          <Redirect to="/login" />
        </Switch>
      </Router>
    );
  }
}

export default App;

// 路由参阅：https://css-tricks.com/react-router-4/
