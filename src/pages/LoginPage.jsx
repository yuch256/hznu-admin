import React from 'react';
import './LoginPage.css';
import axios from 'axios';
import { message } from 'antd';

import { loginFetch } from '../services/loginReq';

class LoginPage extends React.Component {
  state = {
    usr: '',
    pwd: '',
  };

  async componentDidMount() {
    axios.defaults.baseURL = 'http://localhost:3001';
    // TODO 判断是否登录
    // 如果已经登录就跳转到首页
    // let t = localStorage.getItem('admin-t');
    // axios.defaults.headers.common['Authorization'] = t;
    // if (t) {
    //   try {
    //     let r = await axios.post('/admin/login');
    //     console.log(r)
    //     if (r.data.result === 1) {
    //       this.props.history.push('/#/')
    //     }
    //   } catch (err) {
    //     console.log(err)
    //   }
    // }
  }

  login = async e => {
    e.preventDefault()
    // TODO 登录校验
    let data = {
      user_id: document.getElementById('usr').value,
      pwd: document.getElementById('pwd').value
    };
    let { result, msg, token } = await loginFetch(data);
    if (result === 0) message.error(msg, 2)
    else {
      localStorage.setItem('admin-t', token)
      this.props.history.push('/')
    }
    console.log('login')
    localStorage.setItem('hznu-t', '算你登录了')
    // this.props.history.push('/')
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
