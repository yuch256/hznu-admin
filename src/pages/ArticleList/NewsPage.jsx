import React, { Component } from 'react';
import { Layout, Breadcrumb, Table } from 'antd';

const { Content } = Layout;
const { Column } = Table;

export default class NewsPage extends Component {
  render() {
    return (
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>文章列表</Breadcrumb.Item>
          <Breadcrumb.Item>师大要闻</Breadcrumb.Item>
        </Breadcrumb>
        <div className='container'>
          <Table dataSource={data}>
            <Column title='标题' dataIndex='title' key='title' />
            <Column title='作者' dataIndex='author' key='author' />
            <Column title='发布时间' dataIndex='initTime' key='initTime' />
            <Column title='更新时间' dataIndex='updateTime' key='updateTime' />
            <Column
              title='编辑'
              dataIndex='action'
              key='action'
              render={() => (<span><a href="/list/sdyw">editor</a></span>)}
            />
          </Table>
        </div>
      </Content>
    )
  }
}

const data = [
  {
    key: '1',
    title: '1',
    author: '1',
    initTime: '1',
    updateTime: '1',
  }
];
