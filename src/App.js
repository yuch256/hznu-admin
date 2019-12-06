import React from 'react';
import { HashRouter as Router, Switch, Redirect } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';

import BasicLayout from './layouts/BasicLayout';
import Index from './pages/Index';
import AddArticle from './pages/AddArticle.jsx';

function App() {
  return (
    <Router>
      <Switch>
        <BasicLayout path='/' component={Index} />
        <BasicLayout path='/add' component={AddArticle} />
        {/* <Redirect to="/" /> */}
      </Switch>
    </Router>
  );
}

export default App;
