import React, { Component } from 'react';
import { Layout, Breadcrumb, Table } from 'antd';
import { Link } from 'react-router-dom';

import { selnewsFetch } from '../../services/newsFetch';

const { Content } = Layout;

export default class NewsPage extends Component {
  state = {
    data: [],
  };

  async componentDidMount() {
    try {
      let r = await selnewsFetch({ type: '师大要闻' });
      // let r = await selnewsFetch({ type: '通知公告' });
      let { data } = r.data;
      console.log(data)
      let dataSource = [];
      data.forEach(v => {
        v.key = v.news_id;
        dataSource.push(v);
      });
      this.setState({ data: dataSource });
    } catch (err) { console.log(err) }
  }

  render() {
    let { data } = this.state;

    return (
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>文章列表</Breadcrumb.Item>
          <Breadcrumb.Item>师大要闻</Breadcrumb.Item>
        </Breadcrumb>
        <div className='container'>
          <Table dataSource={data} columns={columns}>
          </Table>
        </div>
      </Content>
    )
  }
}

const columns = [
  {
    title: '标题',
    dataIndex: 'news_name',
    key: 'news_name',
  },
  {
    title: '用户ID',
    dataIndex: 'user_id',
    key: 'user_id',
  },
  {
    title: '用户名',
    dataIndex: 'user_name',
    key: 'user_name',
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    key: 'create_time',
  },
  {
    title: '更新时间',
    dataIndex: 'update_time',
    key: 'update_time',
  },
  {
    title: '编辑',
    dataIndex: 'edit',
    key: 'edit',
    render: () => (
      // <span key='dslkf'><a href="/list/sdyw">edit</a></span>
      <Link to='/'>edit</Link>
    )
  }
];
