import React from 'react';
import './LoginPage.css';
import { message } from 'antd';

import { token } from '../utils/config';
import { loginFetch } from '../services/login';

class LoginPage extends React.Component {
  state = {
    usr: '',
    pwd: '',
  };

  componentDidMount() {
    // TODO 判断是否登录
    // 如果已经登录就跳转到首页
    if (token) this.props.history.push('/')
  }

  handleChangeUsr = e => {
    this.setState({ usr: e.target.value })
  }
  handleChangePwd = e => {
    this.setState({ pwd: e.target.value })
  }

  login = async e => {
    e.preventDefault()
    // TODO 登录校验
    // let { result, msg } = await loginFetch()
    // if (result === 0) message.error(msg, 2)
    // else {
    // }
    localStorage.setItem('hznu-t', '算你登录了')
    this.props.history.push('/')
  }

  render() {
    const { usr, pwd } = this.state;
    return (
      <div className="g-container">
        <div className="g-signup">
          <div className="form-auto">
            <div className="form-header">
              <h1>Login</h1>
            </div>
            <form onSubmit={this.login}>
              <div className="from-row">
                <label htmlFor="usr" className="from-label">User</label>
                <input value={usr} onChange={this.handleChangeUsr} type="usr" className="from-input" required />
              </div>
              <div className="from-row">
                <label htmlFor="pwd" className="from-label">Password</label>
                <input value={pwd} onChange={this.handleChangePwd} type="password" className="from-input" required />
              </div>
              <div className="from-row">
                <button type="submit" className="from-btn">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginPage
