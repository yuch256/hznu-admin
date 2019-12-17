import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

export default class AuthorizedRoute extends Component {
  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route {...rest} render={props => {
        console.log(`auth: ${this.props.logined}`)
        return this.props.logined
          ? <Component {...props} />
          : <Redirect to="/login" />
      }} />
    )
  }
}
