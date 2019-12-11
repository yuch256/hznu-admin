import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = ({ history }) => (
  < div >
    <h1>Login Page</h1>
    <Link to="/">to index</Link>
    <button onClick={() => {
      history.push('/');
    }}>Login</button>
  </div >
)

export default LoginPage
