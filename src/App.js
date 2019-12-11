import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';

import BasicLayout from './layouts/BasicLayout';
import UnauthorizedLayout from './layouts/UnauthorizedLayout';
import AuthorizedRoute from './AuthorizedRoute';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={UnauthorizedLayout} />
        <AuthorizedRoute path="/" component={BasicLayout} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;

// 路由参阅：https://css-tricks.com/react-router-4/
