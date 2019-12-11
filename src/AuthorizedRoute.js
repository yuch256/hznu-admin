import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

export default class AuthorizedRoute extends Component {
  state = {
    logined: true,
  };

  componentWillMount() {
    // TODO 判断是否登录
  }

  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route {...rest} render={props => {
        return this.state.logined
          ? <Component {...props} />
          : <Redirect to="/login" />
      }} />
    )
  }
}
