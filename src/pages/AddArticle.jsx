import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';

import Editor from '../components/common/Editor';

const { Content } = Layout;

export default class AddArticle extends Component {
  render() {
    return (
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <Editor />
        </div>
      </Content>
    )
  }
}
