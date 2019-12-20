import React, { Component } from 'react';
import { Layout, Breadcrumb, Button, Modal } from 'antd';
import { message } from 'antd';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';

import { addnewsFetch } from '../services/newsFetch';
import ArticleTypeSelect from '../components/common/ArticleTypeSelect';
import ArticleTitleComp from '../components/common/ArticleTitleComp';

const { Content } = Layout;
const initEditor = '<p>Hello <b>World!</b></p>';

export default class AddArticle extends Component {
  state = {
    editorState: BraftEditor.createEditorState(initEditor),
    outputHTML: initEditor,
    type: null,
    title: null,
    iseditortitle: true,
    // modal
    confirmLoading: false,
    modalVisible: false,
  };
  // 点击确认提交按钮
  handleSubmit = async () => {
    let { type, title, outputHTML, editorState } = this.state;
    let raw = editorState.toRAW();         // raw用于下次编辑，html用户前台展示
    let data = { type, title, content: outputHTML, raw };
    this.setState({ modalVisible: true, confirmLoading: true });
    let r = await addnewsFetch(data);
    console.log(r.data)
    this.setState({ modalVisible: false, confirmLoading: false });
    if (r.data.result === 1) message.success(r.data.msg, 2);
    else message.error(r.data.msg, 2);
  };
  // 更改文章内容
  handleChangeEditor = (editorState) => {
    this.setState({
      editorState,
      outputHTML: editorState.toHTML()
    });
  };
  // 点击提交或取消按钮
  handleChangeModalVisible = () => {
    let { type, title } = this.state;
    if (!type) return message.warn('请选择文章类别！', 2);
    if (!title) return message.warn('请填写文章标题！', 2);
    this.setState({ modalVisible: !this.state.modalVisible });
  };
  // 更改文章类型
  handleChangeArticleType = (value) => {
    this.setState({ type: value });
  };
  // 更改文章标题
  handleChangeArticleTitle = (e) => {
    this.setState({ title: e.target.value });
  }
  // 更改文章标题填写状态
  handleChangeArticleTitleState = () => {
    if (this.state.title) this.setState({ iseditortitle: !this.state.iseditortitle });
    else message.warn('请填写文章标题！', 2)
  }

  render() {
    let { editorState, outputHTML, type, iseditortitle, title } = this.state;
    return (
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>添加文章</Breadcrumb.Item>
        </Breadcrumb>
        <div className='container'>
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
      </Content >
    )
  }
}
