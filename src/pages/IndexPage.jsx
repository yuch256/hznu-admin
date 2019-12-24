import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';

const { Content } = Layout;

export default class IndexPage extends Component {
  render() {
    return (
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>功能介绍</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          文章列表、添加文章、首页轮播、用户管理
        </div>
      </Content>
    )
  }
}
