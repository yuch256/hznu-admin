import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { Table, Divider, message, Button, Modal, Popconfirm, Spin } from 'antd';
import { Route, withRouter } from 'react-router-dom';
import BraftEditor from 'braft-editor';

import { selnewsFetch, updatenewsFetch, deletenewsFetch } from '../../services/newsFetch';
import { getcommentFetch, deletecommentFetch } from '../../services/commentFetch';
import ArticleTitleComp from '../../components/common/ArticleTitleComp';
import ArticleTypeSelect from '../../components/common/ArticleTypeSelect';
import ArticleComment from '../../components/ArticleList/ArticleComment';

const { Content } = Layout;
const { Column } = Table;
const initEditor = '';

class NewsPage extends Component {
  state = {
    // 列表页面
    data: [],          // 列表数据
    commentData: [],   // 评论数据
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
    spinLoading: true,       // 显示骨架屏
  };
  // 用这个，点击导航栏组件就能更新了
  componentWillReceiveProps(nextProps) {
    this.updateData(nextProps.listType)
  };

  componentDidMount() {
    this.updateData(this.props.listType)
  };
  // 更新列表数据
  updateData = async (listType) => {
    let r = await selnewsFetch([{ key: 'type', value: listType }]);
    let { data } = r;
    console.log(data)
    let dataSource = [];
    data.forEach(item => {
      item.key = item.news_id;
      dataSource.push(item);
    });
    this.setState({ data: dataSource, spinLoading: false });
  };
  // 列表页面点击编辑某一文章，加载改文章数据，跳转到编辑页面
  handleClickEdit = async (record) => {
    let r = await selnewsFetch([{ key: 'news_id', value: record.news_id }]);
    let { data } = r;
    this.setState({
      isEdit: true,
      title: data[0].news_name,
      type: data[0].type,
      editorState: BraftEditor.createEditorState(data[0].news_raw),
      outputHTML: data[0].news_content,
      news_id: data[0].news_id,
    });

    // this.loadCommont();
  };
  // 加载评论
  loadCommont = async (end, newEnd) => {
    let { news_id } = this.state;

    let r = await getcommentFetch({ news_id, end, newEnd });
    let { data } = r.data;
    console.log(data)
    this.setState({ commentData: data });
  };
  // 点击删除文章 // TODO 删除文章时后端一并删除相关评论
  handleClickDelete = async (record) => {
    let r = await deletenewsFetch({ news_id: record.news_id });
    if (r.data.result === 1) {
      const data = [...this.state.data];
      this.setState({ data: data.filter(item => item.key !== record.news_id) });
      message.success(r.data.msg, 2);
    } else message.error(r.data.msg, 2);
  }
  // 点击删除评论
  handleClickDeleteCommont = async (item) => {
    let r = await deletecommentFetch({ comment_id: item.comment_id });
    console.log(r)
    if (r.data.result === 1) {
      const commentData = [...this.state.commentData];
      this.setState({ commentData: commentData.filter(i => i.comment_id !== item.comment_id) });
      message.success(r.data.msg, 2);
    } else message.error(r.data.msg, 2);
  };
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
    let { data, commentData, iseditortitle, editorState, title, type, outputHTML } = this.state;
    let { spinLoading, news_id } = this.state;

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
                <>
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
                  {/* 富文本框 */}
                  <div className="editor-wrapper">
                    <BraftEditor
                      value={editorState}
                      onChange={this.handleChangeEditor}
                    />
                  </div>
                  {/* 预览框 */}
                  <h5 className='output-title'>预览</h5>
                  <div
                    className="output-content"
                    dangerouslySetInnerHTML={{ __html: outputHTML }}
                  />
                  {/* 评论管理 */}
                  <ArticleComment
                    data={commentData}
                    // loadCommont={this.loadCommont}
                    news_id={news_id}
                    handleDelete={this.handleClickDeleteCommont}
                  />
                </>
              )
              : (
                <>
                  {
                    spinLoading ?
                      (
                        <div style={{ minHeight: '360px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <Spin size='large' />
                        </div>
                      ) :
                      <TableList
                        data={data}
                        handleClickEdit={this.handleClickEdit}
                        handleClickDelete={this.handleClickDelete}
                      />
                  }
                </>
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

// withRouter，解决this.props.history.push中undefined问题
export default withRouter(NewsPage);

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
