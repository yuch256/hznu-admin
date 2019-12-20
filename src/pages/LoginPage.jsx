import React from 'react';
import './LoginPage.css';
import { message } from 'antd';

import { loginVerifyFetch, authVerifyFetch } from '../services/loginFetch';
import { tokenKey } from '../utils/config';

class LoginPage extends React.Component {
  state = {
    usr: '',
    pwd: '',
  };

  async componentDidMount() {
    // 身份认证，成功则跳转到首页
    let t = localStorage.getItem(tokenKey);

    if (t) {
      try {
        let data = await authVerifyFetch();
        console.log('login' + JSON.stringify(data))
        if (data.result) {
          this.props.history.push('/');
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  login = async e => {
    e.preventDefault()
    // 登录校验
    let data = {
      user_id: this.state.usr,
      pwd: this.state.pwd
    };
    let { result, msg, token } = await loginVerifyFetch(data);

    if (result === 1) {
      localStorage.setItem(tokenKey, token);
      message.success(msg, 2);
      this.props.history.push('/');
    } else message.error(msg, 2);
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
            <form onSubmit={this.login} >
              <div className="from-row">
                <label htmlFor="usr" className="from-label">Username</label>
                <input
                  className="from-input"
                  value={usr}
                  type="usr"
                  id='usr'
                  onChange={e => this.setState({ usr: e.target.value })}
                  required />
              </div>
              <div className="from-row">
                <label htmlFor="pwd" className="from-label">Password</label>
                <input
                  className="from-input"
                  value={pwd}
                  type="password"
                  id='pwd'
                  onChange={e => this.setState({ pwd: e.target.value })}
                  required />
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
