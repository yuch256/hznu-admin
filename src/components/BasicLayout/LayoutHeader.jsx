import React, { Component } from 'react';
import { Layout, Icon, Avatar, Menu, Dropdown } from 'antd';
import './LayoutHeader.css';

const { Header } = Layout;

export default class LayoutHeader extends Component {
  state={}
  loginout = () => {
    // TODO 发送退出登录信号
    localStorage.removeItem('hznu-t')
    // window.location.reload()
    window.location.href = '/#/login'
  }

  render() {
    let { toggle, collapsed, usr } = this.props;
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
              <span>{usr}</span>
            </span>
          </Dropdown>
        </div>
      </Header>
    )
  }
}
