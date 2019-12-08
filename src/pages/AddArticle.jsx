import React, { Component } from 'react';
import { Layout, Breadcrumb, Button, Select, Input, Icon, Tooltip } from 'antd';
import { message } from 'antd';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';

const { Content } = Layout;
const { Option } = Select;

export default class AddArticle extends Component {
  state = {
    editorState: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>'),
    outputHTML: '<p></p>',
    type: null,
    title: null,
    iseditortitle: true,
  };

  async componentDidMount() {
    // 假设此处从服务端获取html格式的编辑器内容
  };

  submitContent = async () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    const htmlContent = this.state.editorState.toHTML();
    this.setState({ editorState: BraftEditor.createEditorState(htmlContent) });
  };

  handleEditorChange = (editorState) => {
    this.setState({
      editorState,
      outputHTML: editorState.toHTML()
    });
  };

  handleTypeSelectChange = (value) => {
    this.setState({ type: value });
  };

  handleTitleCompChange = (e) => {
    this.setState({ title: e.target.value });
  }
  handleTitleCompStateChange = () => {
    if (this.state.title) this.setState({ iseditortitle: !this.state.iseditortitle });
    else message.warn('请填写标题！', 2)
  }

  render() {
    let { editorState, outputHTML, type, iseditortitle, title } = this.state;
    return (
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>添加文章</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
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
              <Button type='primary' className='btn-primary'>提交</Button>
            </div>
          </div>
          <div className="editor-wrapper">
            <BraftEditor
              value={editorState}
              onChange={this.handleEditorChange}
              onSave={this.submitContent}
            />
          </div>
          <h5 className='output-title'>输出内容</h5>
          <div className="output-content">{outputHTML}</div>
        </div>
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
        onBlur={() => console.log(1)}
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
