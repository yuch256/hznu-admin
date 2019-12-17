import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';

import IndexPage from '../pages/IndexPage';
import AddArticlePage from '../pages/AddArticlePage';
import NewsPage from '../pages/ArticleList/NewsPage';
import NoticePage from '../pages/ArticleList/NoticePage';
import LayoutHeader from '../components/BasicLayout/LayoutHeader';

const { Sider } = Layout;
const { SubMenu } = Menu;
const menuData = [
  {
    path: '/',
    iconType: 'home',
    text: '功能介绍',
  },
  {
    iconType: 'bars',
    text: '文章列表',
    subData: [
      {
        path: '/list/sdyw',
        text: '师大要闻'
      },
      {
        path: '/list/tzgg',
        text: '通知公告'
      }
    ],
  },
  {
    path: '/edit',
    iconType: 'edit',
    text: '添加文章',
  }
];

export default class BasicLayout extends Component {
  state = {
    collapsed: false,
    selectedKey: '/',
    usr: 'Admin',
  };

  componentDidMount() {
    // TODO 登录判断
    let t = localStorage.getItem('hznu-t')
    if (!t) this.props.history.push('/login')
  };

  toggle = () => {
    this.setState({ collapsed: !this.state.collapsed })
  };

  render() {
    let { collapsed, selectedKey, usr } = this.state;
    const logo = () => {
      return collapsed
        ? <img className='logo-circle' src={require('../assets/logo/logo.svg')} alt='logo' />
        : <img className='logo-all' src={require('../assets/logo/logo-all.svg')} alt='logo' />
    };
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.toggle}>
          <div style={{ height: 32, backgroundColor: 'rgba(255, 255, 255, 0.2)', margin: 16, textAlign: 'center' }}>
            {logo()}
          </div>
          <SiderMenu selectedKey={selectedKey} />
        </Sider>
        <Layout>
          <LayoutHeader
            toggle={this.toggle}
            collapsed={collapsed}
            usr={usr}
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
      defaultSelectedKeys={[props.selectedKey]}
    // defaultOpenKeys={['文章列表']}
    >
      {
        menuData.map(item => {
          if (item.path) {
            return (
              <Menu.Item key={item.path}>
                <NavLink to={item.path}>
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
                      <Menu.Item key={value.path}>
                        <NavLink to={value.path}>{value.text}</NavLink>
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
