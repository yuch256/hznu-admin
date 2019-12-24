import React, { Component } from 'react';
import { Layout, Icon, Avatar, Menu, Dropdown, message } from 'antd';
import './LayoutHeader.css';
import { authVerifyFetch, outVerifyFetch } from '../../services/loginFetch';
import { tokenKey } from '../../utils/config';

const { Header } = Layout;

export default class LayoutHeader extends Component {
  async componentDidMount() {
    let t = localStorage.getItem(tokenKey);

    if (t) {
      try {
        let data = await authVerifyFetch();
        console.log('header' + JSON.stringify(data))
        if (data.result === 1) {
          this.props.getUsername(data.user_name);
          message.success(data.msg, 2);
        } else {
          this.props.history.push('/login');
          message.error(data.msg, 2);
        }
      } catch (err) {
        this.props.history.push('/login');
        console.log(err)
      }
    } else {
      this.props.history.push('/login');
    }
  }

  loginout = async () => {
    let r = await outVerifyFetch();
    if (r.data.result === 1) {
      this.props.history.push('/login');
      message.success('退出成功！', 2);
      localStorage.removeItem(tokenKey);
    } else message.error('退出失败！', 2);
    
  }

  render() {
    let { toggle, collapsed, user_name } = this.props;
    const menu = (
      <Menu>
        <Menu.Item key='logout' onClick={this.loginout}>
          <Icon type='logout' />
          退出登录
        </Menu.Item>
      </Menu>
    );

    return (
      <Header className='bas-layout-header'>
        <span className='trigger'>
          <Icon
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={toggle}
          />
        </span>
        <div className='bas-layout-header-right'>
          <Dropdown overlay={menu} placement='bottomLeft' overlayStyle={{ minWidth: 155 }}>
            <span className='bas-layout-header-block bas-dropdown-trigger'>
              <Avatar icon="user" className='bas-avatar' />
              <span>{user_name}</span>
            </span>
          </Dropdown>
        </div>
      </Header>
    )
  }
}
