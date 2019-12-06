import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Route } from 'react-router-dom';
import './BasicLayout.css';

const { Sider } = Layout;

export default class BasicLayout extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({ collapsed: !this.state.collapsed })
  };

  render() {
    let { component: Component, ...reset } = this.props;
    return (
      <Route exact {...reset} render={match => (
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.toggle}>
            <div className='logo'></div>
            <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
              <Menu.Item key='1'>
                <Icon type='user' />
                <span>nav 1</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="video-camera" />
                <span>nav 2</span>
              </Menu.Item>
            </Menu>
          </Sider>
          {/* {console.log(match)} */}
          <Component {...match} toggle={this.toggle} collapsed={this.state.collapsed} />
        </Layout>
      )} />
    )
  }
}

// https://www.oschina.net/question/253614_2237525
