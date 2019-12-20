import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';

import IndexPage from '../pages/IndexPage';
import AddArticlePage from '../pages/AddArticlePage';
import NewsPage from '../pages/ArticleList/NewsPage';
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
      },
      {
        path: '/list/djwh',
        text: '党建文化'
      },
      {
        path: '/list/jxky',
        text: '教学科研'
      },
      {
        path: '/list/kylw',
        text: '科研论文'
      }
    ],
  },
  {
    path: '/add',
    iconType: 'file-add',
    text: '添加文章',
  }
];

export default class BasicLayout extends Component {
  state = {
    collapsed: false,
    selectedKey: '/',
    user_name: '???',
  };

  // 获取用户名
  getUsername = (name) => {
    this.setState({ user_name: name });
  }

  toggle = () => {
    this.setState({ collapsed: !this.state.collapsed })
  };

  render() {
    let { collapsed, selectedKey, user_name } = this.state;
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
            user_name={user_name}
            getUsername={this.getUsername}
            history={this.props.history}
          />
          <Switch>
            <Route path="/" exact component={IndexPage} />
            <Route path="/list/sdyw" render={() => <NewsPage listType='师大要闻' />} />
            <Route path="/list/tzgg" render={() => <NewsPage listType='通知公告' />} />
            <Route path="/list/djwh" render={() => <NewsPage listType='党建文化' />} />
            <Route path="/list/jxky" render={() => <NewsPage listType='教学科研' />} />
            <Route path="/list/kylw" render={() => <NewsPage listType='科研论文' />} />
            <Route path="/add" component={AddArticlePage} />
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
