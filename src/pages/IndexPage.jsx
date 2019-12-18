import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

const { Content } = Layout;
// const buttonData = {
//   size: 'large',
//   list: [
//     // { text: '师大要闻', link: '/list/sdyw' },
//     // { text: '通知公告', link: '/list/tzgg' },
//     { text: '党建文化', link: '/' },
//     { text: '教学科研', link: '/' },
//     { text: '科研论文', link: '/' },
//   ]
// }

export default class IndexPage extends Component {
  render() {
    return (
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>功能介绍</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          Bill is a cat.
          <Link to='/edit'>edit</Link>
        </div>
      </Content>
    )
  }
}