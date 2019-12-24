import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { Table, Divider, Popconfirm, message, Button } from 'antd';
import { Modal, Form, Input, Icon, Select } from 'antd';

import { getuserFetch, deleteuserFetch, adduserFetch } from '../services/userFetch';
import { getallcollegeFetch } from '../services/collegeFetch';

const { Content } = Layout;
const { Column } = Table;
const { Option } = Select;

class UserManagePage extends Component {
  state = {
    dataSource: [],
    collegeList: [],    // 学院列表
    isEdit: false,
    modalVisible: false,  // model是否开启
    loading: false,// 提交按钮是否转圈圈
  };

  async componentDidMount() {
    let r = await getuserFetch();
    if (r.data.result === 1) {
      let { data } = r.data;
      let dataSource = [];
      data.forEach(item => {
        item.key = item.user_id;
        dataSource.push(item);
      });
      this.setState({ dataSource });
    } else this.props.history.push('/login');

    this.getallcollege();
  };
  // 获取所有学院
  getallcollege = async () => {
    let r = await getallcollegeFetch();
    console.log(r.data.data)
    if (r.data.result === 1) this.setState({ collegeList: r.data.data });
  };
  // 点击删除用户按钮
  handleClickDelete = async (record) => {
    let r = await deleteuserFetch({ user_id: record.user_id });
    if (r.data.result === 1) {
      const data = [...this.state.dataSource];
      this.setState({ dataSource: data.filter(item => item.key !== record.user_id) });
      message.success(r.data.msg, 2);
    } else message.error(r.data.msg, 2);
  };
  // 点击添加用户提交按钮
  handleSubmitAddUser = () => {
    this.props.form.validateFields(async (err, values) => {
      console.log(values);
      if (!err) {
        this.setState({ loading: true });
        let r = await adduserFetch(values);
        if (r.data.result === 1) message.success(r.data.msg, 2);
        else message.error(r.data.msg, 2);
      } else message.error('提交失败！');
      this.setState({ loading: false });
    });
  };

  render() {
    let { dataSource, loading, collegeList } = this.state;
    const { getFieldDecorator } = this.props.form;

    return (
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>用户管理</Breadcrumb.Item>
          <Breadcrumb.Item>{this.props.listType}</Breadcrumb.Item>
        </Breadcrumb>
        <div className='container'>
          <Button onClick={() => this.setState({ modalVisible: true })} type="primary" style={{ marginBottom: 16 }}>
            添加用户
          </Button>
          <UserTableList
            dataSource={dataSource}
            handleClickDelete={this.handleClickDelete}
          />

          <Modal
            title="用户信息"
            visible={this.state.modalVisible}
            onCancel={() => this.setState({ modalVisible: false })}
            footer={null}
          >
            <ModalContent
              getFieldDecorator={getFieldDecorator}
              handleSubmit={this.handleSubmitAddUser}
              loading={loading}
              collegeList={collegeList}
            />
          </Modal>
        </div>
      </Content>
    )
  }
}

function ModalContent(props) {
  let { getFieldDecorator, loading, collegeList } = props;

  return (
    <Form
      onSubmit={props.handleSubmit}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 19 }}
      labelAlign='left'
      style={{ border: 0 }}
    >
      <Form.Item label='UserID'>
        {getFieldDecorator('user_id', {
          rules: [{ message: '请输入用户ID！', require: true }, {
            pattern: /^\w{1,10}$/, message: '1-10个数字、字母或下划线'
          }],
        })(
          <Input
            prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="1-10个数字、字母或下划线"
          />,
        )}
      </Form.Item>
      <Form.Item label='Username'>
        {getFieldDecorator('user_name', {
          rules: [{ require: true, message: '请输入用户名！' }, {
            pattern: /^\w{1,8}$/, message: '1-8个数字、字母或下划线'
          }],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="1-8个数字、字母或下划线"
          />,
        )}
      </Form.Item>
      <Form.Item label='College'>
        {getFieldDecorator('college_id', {
          rules: [{ require: true, message: '请选择学院！' }],
        })(
          <Select placeholder='选择学院'>
            {
              collegeList.map(item => {
                return <Option key={item.college_id}>{item.college_name}</Option>
              })
            }
          </Select>
        )}
      </Form.Item>
      <Form.Item label='Password'>
        {getFieldDecorator('password', {
          rules: [{ require: true, message: '请输入密码！' }, {
            pattern: /^\w{6,15}$/, message: '6-15个数字、字母或下划线'
          }],
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="6-15个数字、字母或下划线"
          />,
        )}
      </Form.Item>
      <Form.Item wrapperCol={{ span: 1, offset: 4 }}>
        <Button type='primary' htmlType="submit" loading={loading}>提交</Button>
      </Form.Item>
    </Form>
  )
}

function UserTableList(props) {
  return (
    <Table dataSource={props.dataSource}>
      <Column title='用户ID' dataIndex='user_id' key='user_id' />
      <Column title='用户名' dataIndex='user_name' key='user_name' />
      <Column title='密码' dataIndex='password' key='password' />
      <Column title='学院' dataIndex='college_name' key='college_name' />
      <Column
        title='编辑'
        dataIndex='edit'
        key='edit'
        render={(text, record) => (
          <span style={{ cursor: 'pointer', color: '#40a9ff' }}>
            <span /* onClick={() => props.handleClickEdit(record)} */>Edit</span>
            <Divider type='vertical' />
            <Popconfirm title="Sure to delete?" onConfirm={() => props.handleClickDelete(record)}>
              <span>Delete</span>
            </Popconfirm>
          </span>
        )}
      />
    </Table>
  )
}

export default Form.create()(UserManagePage);
