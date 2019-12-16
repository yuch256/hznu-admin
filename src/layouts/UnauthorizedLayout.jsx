import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import LoginPage from '../pages/LoginPage';

const UnauthorizedLayout = () => (
  <div className='login-container'>
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Redirect to="/login" />
    </Switch>
  </div>
)

export default UnauthorizedLayout
