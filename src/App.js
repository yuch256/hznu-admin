import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';

import BasicLayout from './layouts/BasicLayout';

function App() {
  return (
    <Router>
      <Switch>
        {/* <BasicLayout path='/add' component={AddArticle} />
        <BasicLayout path='/' component={Index} /> */}
        <Route path="/" component={BasicLayout} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
