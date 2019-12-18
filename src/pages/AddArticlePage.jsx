import React, { Component } from 'react';
import { Layout, Breadcrumb, Button, Select, Input, Icon, Tooltip, Modal } from 'antd';
import { message } from 'antd';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';

import { addnewsFetch } from '../services/newsFetch';

const { Content } = Layout;
const { Option } = Select;
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

  async componentDidMount() {
    // 假设此处从服务端获取html格式的编辑器内容
  };

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

  handleEditorChange = (editorState) => {
    this.setState({
      editorState,
      outputHTML: editorState.toHTML()
    });
  };

  handleChangeModalVisible = () => {
    let { type, title } = this.state;
    if (!type) return message.warn('请选择文章类别！', 2);
    if (!title) return message.warn('请填写文章标题！', 2);
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  handleTypeSelectChange = (value) => {
    this.setState({ type: value });
  };

  handleTitleCompChange = (e) => {
    this.setState({ title: e.target.value });
  }
  handleTitleCompStateChange = () => {
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
              <TitleComp
                iseditortitle={iseditortitle}
                title={title}
                handleChange={this.handleTitleCompChange}
                handleStateChange={this.handleTitleCompStateChange}
              />
            </div>
            <div>
              <TypeSelect type={type} handleChange={this.handleTypeSelectChange} />
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
              onChange={this.handleEditorChange}
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

function TypeSelect(props) {
  const seletData = ['师大要闻', '通知公告', '党建文化', '教学科研', '科研论文'];
  let { type, handleChange } = props;
  return (
    <Select
      dropdownMatchSelectWidth={false}
      onSelect={(value) => handleChange(value)}
      value={type || '文章类别'}
    >
      {
        seletData.map(value => {
          return (
            <Option key={value}>{value}</Option>
          )
        })
      }
    </Select>
  )
}

function TitleComp(props) {
  let { iseditortitle, title, handleChange, handleStateChange } = props;
  if (iseditortitle) {
    return (
      <Input
        placeholder="Title"
        allowClear
        value={title}
        onChange={handleChange}
        onPressEnter={handleStateChange}
        maxLength={50}
        prefix={<Icon type="rocket" style={{ color: 'rgba(0,0,0,.25)' }} />}
      />
    )
  } else {
    return (
      <Tooltip title={title}>
        <Button onClick={handleStateChange} icon='edit'>
          <span>{title}</span>
        </Button>
      </Tooltip>
    )
  }
}
