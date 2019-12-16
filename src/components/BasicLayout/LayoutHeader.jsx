import React, { Component } from 'react';
import { Layout, Icon, Avatar } from 'antd';

const { Header } = Layout;

export default class LayoutHeader extends Component {
  render() {
    let { toggle, collapsed } = this.props;
    return (
      <Header className='l-header'>
        <span className='trigger'>
          <Icon
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={toggle}
          />
        </span>
        <div className='l-header-right'>
          <span className='l-right-trigger'>
            {/* <span className='l-header-icon'> */}
              <Avatar icon="user" />
            {/* </span> */}
            <span>123</span>
          </span>
        </div>
      </Header>
    )
  }
}
