import React, { Component } from 'react';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';

export default class Editor extends Component {
  state = {
    editorState: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>'),
    outputHTML: '<p></p>',
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
  }

  render() {
    let { editorState, outputHTML } = this.state;
    return (
      <div>
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
    )
  }
}
