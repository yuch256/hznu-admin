import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import './BasicLayout.css';

import IndexPage from '../pages/IndexPage';
import AddArticlePage from '../pages/AddArticlePage';
import NewsPage from '../pages/ArticleList/NewsPage';
import NoticePage from '../pages/ArticleList/NoticePage';
import LayoutHeader from '../components/BasicLayout/LayoutHeader';

const { Sider } = Layout;
const { SubMenu } = Menu;
const menuData = [
  {
    link: '/',
    iconType: 'home',
    text: '功能介绍',
  },
  {
    iconType: 'bars',
    text: '文章列表',
    subData: [
      {
        link: '/list/sdyw',
        text: '师大要闻'
      },
      {
        link: '/list/tzgg',
        text: '通知公告'
      }
    ],
  },
  {
    link: '/edit',
    iconType: 'edit',
    text: '添加文章',
  }
];

export default class BasicLayout extends Component {
  state = {
    collapsed: false,
    defaultSelectedKey: window.location.pathname,
  };

  toggle = () => {
    this.setState({ collapsed: !this.state.collapsed })
  };

  render() {
    let { collapsed, defaultSelectedKey } = this.state;
    const logo = () => {
      return collapsed
        ? <img className='logo-circle' src={require('../assets/logo/logo.svg')} alt='logo' />
        : <img className='logo-all' src={require('../assets/logo/logo-all.svg')} alt='logo' />
    };
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.toggle}>
          <div className='logo'>
            {logo()}
          </div>
          <SiderMenu defaultSelectedKey={defaultSelectedKey} />
        </Sider>
        <Layout>
          <LayoutHeader
            toggle={this.toggle}
            collapsed={collapsed}
          />
          <Switch>
            <Route path="/" exact component={IndexPage} />
            <Route path="/list/sdyw" component={NewsPage} />
            <Route path="/list/tzgg" component={NoticePage} />
            <Route path="/edit" component={AddArticlePage} />
            <Redirect to="/" />
          </Switch>
        </Layout>
      </Layout>
    )
  }
}

function SiderMenu(props) {
  return (
    <Menu
      theme='dark'
      mode='inline'
      defaultSelectedKeys={[props.defaultSelectedKey]}
      defaultOpenKeys={['文章列表']}
    >
      {
        menuData.map(item => {
          if (item.link) {
            return (
              <Menu.Item key={item.link}>
                <NavLink to={item.link}>
                  <Icon type={item.iconType} />
                  <span>{item.text}</span>
                </NavLink>
              </Menu.Item>
            )
          } else {
            return (
              <SubMenu
                key={item.text}
                title={
                  <span>
                    <Icon type={item.iconType} />
                    <span>{item.text}</span>
                  </span>
                }
              >
                {
                  item.subData.map(value => {
                    return (
                      <Menu.Item key={value.link}>
                        <NavLink to={value.link}>{value.text}</NavLink>
                      </Menu.Item>
                    )
                  })
                }
              </SubMenu>
            )
          }
        })
      }
    </Menu>
  )
}
