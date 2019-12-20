import React, { Component } from 'react';
import { Layout, Breadcrumb, Table, Divider, message, Button, Modal, Popconfirm } from 'antd';
import { Route } from 'react-router-dom';
import BraftEditor from 'braft-editor';

import { selnewsFetch, updatenewsFetch, deletenewsFetch } from '../../services/newsFetch';
import ArticleTitleComp from '../../components/common/ArticleTitleComp';
import ArticleTypeSelect from '../../components/common/ArticleTypeSelect';

const { Content } = Layout;
const { Column } = Table;
const initEditor = '';

export default class NewsPage extends Component {
  state = {
    // 列表页面
    data: [],          // 列表数据
    isEdit: false,     // 是否进入编辑页面
    // 编辑页面
    editorState: BraftEditor.createEditorState(initEditor),     // 文章内容的值
    outputHTML: initEditor,    // 文章内容HTML形式
    iseditortitle: false,   // 是否正在编辑标题
    title: null,         // 标题
    type: null,          // 文章类型
    news_id: null,       // 文章唯一id
    // modal
    confirmLoading: false,    // 按钮是否转圈圈
    modalVisible: false,      // modal是否开启
    // listType: null,           // 导航栏文章列表选项
  };
  // 用这个，点击导航栏组件就能更新了
  componentWillReceiveProps(nextProps) {
    this.updateData(nextProps.listType)
  };
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   const { listType } = nextProps;
  //   console.log(nextProps, prevState)
  //   if (listType !== prevState.listType) {
  //     return { listType };
  //   }
  //   return null;
  // }

  componentDidMount() {
    this.updateData(this.props.listType)
  };
  // 更新列表数据
  updateData = async (listType) => {
    try {
      let r = await selnewsFetch([{ key: 'type', value: listType }]);
      let { data } = r.data;
      console.log(data)
      let dataSource = [];
      data.forEach(v => {
        v.key = v.news_id;
        dataSource.push(v);
      });
      this.setState({ data: dataSource });
    } catch (err) { console.log(err) }
  };
  // 列表页面点击编辑某一文章，加载改文章数据，跳转到编辑页面
  handleClickEdit = async (record) => {
    let r = await selnewsFetch([{ key: 'news_id', value: record.news_id }]);
    let { data } = r.data;
    console.log('这是你正在编辑的文章：' + JSON.stringify(data))
    this.setState({
      isEdit: true,
      title: data[0].news_name,
      type: data[0].type,
      editorState: BraftEditor.createEditorState(data[0].news_raw),
      outputHTML: data[0].news_content,
      news_id: data[0].news_id,
    });
  };
  // 点击删除文章
  handleClickDelete = async (record) => {
    let r = await deletenewsFetch({ news_id: record.news_id });
    if (r.data.result === 1) {
      const data = [...this.state.data];
      this.setState({ data: data.filter(item => item.key !== record.news_id) });
      message.success(r.data.msg, 2);
    } else message.error(r.data.msg, 2);
  }
  // 编辑页面点击返回
  handleClickBack = () => {
    this.setState({ isEdit: false });
  };
  // 更改文章标题
  handleChangeArticleTitle = (e) => {
    this.setState({ title: e.target.value });
  };
  // 更改文章标题填写状态
  handleChangeArticleTitleState = () => {
    if (this.state.title) this.setState({ iseditortitle: !this.state.iseditortitle });
    else message.warn('请填写文章标题！', 2)
  };
  // 更改文章类型
  handleChangeArticleType = (value) => {
    this.setState({ type: value });
  };
  // 点击确认提交按钮
  handleSubmit = async () => {
    let { type, title, outputHTML, editorState, news_id } = this.state;
    let raw = editorState.toRAW();         // raw用于下次编辑，html用户前台展示
    let data = { type, title, content: outputHTML, raw, news_id };
    this.setState({ modalVisible: true, confirmLoading: true });
    let r = await updatenewsFetch(data);
    console.log(r)
    this.setState({ modalVisible: false, confirmLoading: false });
    if (r.data.result === 1) message.success(r.data.msg, 2);
    else message.error(r.data.msg, 2);
  };
  // 点击提交或取消按钮
  handleChangeModalVisible = () => {
    let { type, title } = this.state;
    if (!type) return message.warn('请选择文章类别！', 2);
    if (!title) return message.warn('请填写文章标题！', 2);
    this.setState({ modalVisible: !this.state.modalVisible });
  };
  // 更改文章内容
  handleChangeEditor = (editorState) => {
    this.setState({
      editorState,
      outputHTML: editorState.toHTML()
    });
  };

  render() {
    let { data, iseditortitle, editorState, title, type, outputHTML } = this.state;

    return (
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>文章列表</Breadcrumb.Item>
          <Breadcrumb.Item>{this.props.listType}</Breadcrumb.Item>
        </Breadcrumb>
        <div className='container'>
          <Route render={() => {
            return this.state.isEdit
              ? (
                <div>
                  <div className='add-header'>
                    <div>
                      <ArticleTitleComp
                        iseditortitle={iseditortitle}
                        title={title}
                        handleChange={this.handleChangeArticleTitle}
                        handleStateChange={this.handleChangeArticleTitleState}
                      />
                    </div>
                    <div>
                      <ArticleTypeSelect type={type} handleChange={this.handleChangeArticleType} />
                      <Button
                        type='primary'
                        className='btn-primary'
                        onClick={this.handleChangeModalVisible}
                        loading={this.state.confirmLoading}
                      >提交</Button>
                      <Button className='btn-primary' icon='rollback' onClick={this.handleClickBack}>返回</Button>
                    </div>
                  </div>
                  <div className="editor-wrapper">
                    <BraftEditor
                      value={editorState}
                      onChange={this.handleChangeEditor}
                    />
                  </div>
                  <h5 className='output-title'>输出内容</h5>
                  <div className="output-content">{outputHTML}</div>
                </div>
              )
              : (
                <TableList
                  data={data}
                  handleClickEdit={this.handleClickEdit}
                  handleClickDelete={this.handleClickDelete}
                />
              )
          }} />
        </div>

        <Modal
          title="请确认提交信息！"
          okText='确认提交'
          cancelText='取消'
          visible={this.state.modalVisible}
          onOk={this.handleSubmit}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleChangeModalVisible}
        >
          <p>Title: {title}</p>
          <p>Type: {type}</p>
        </Modal>
      </Content>
    )
  }
}

function TableList(props) {
  return (
    <Table dataSource={props.data}>
      <Column title='编号' dataIndex='news_id' key='news_id' />
      <Column title='标题' dataIndex='news_name' key='news_name' />
      <Column title='用户ID' dataIndex='user_id' key='user_id' />
      <Column title='用户名' dataIndex='user_name' key='user_name' />
      <Column title='创建时间' dataIndex='create_time' key='create_time' />
      <Column title='更新时间' dataIndex='update_time' key='update_time' />
      <Column
        title='编辑'
        dataIndex='edit'
        key='edit'
        render={(text, record) => (
          <span style={{ cursor: 'pointer', color: '#40a9ff' }}>
            <span onClick={() => props.handleClickEdit(record)}>Edit</span>
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
