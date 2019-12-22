import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { Upload, Icon, message, Modal, Button } from 'antd';

import { uploadcarouseFetch, getcarouselFetch } from '../services/carouselFetch';
import { baseURL } from '../utils/config';

const { Content } = Layout;

export default class HomeCarousel extends Component {
  state = {
    imgList: [],               // 轮播图片列表
    deleteList: [],            // 要删除的img_id列表
    uploading: false,          // 按钮是否转圈圈
    previewVisible: false,     // 是否正在预览
    previewImage: '',          // 预览的图片
  };

  async componentDidMount() {
    this.getcarouse();
  };
  getcarouse = async () => {
    try {
      let r = await getcarouselFetch();
      let { data } = r.data;
      console.log(data)
      let imgList = this.state.imgList;
      imgList.length = 0;
      data.forEach((value, index) => {
        imgList.push({
          uid: value.img_id,
          name: value.type,
          url: `${baseURL}/${value.path}`
        })
      });
      this.setState({ imgList });
    } catch (err) { console.log(err) }
  }
  // 点击提交按钮上传图片
  hanleUpload = async () => {
    const formData = new FormData();

    this.state.deleteList.forEach((value, i) => {
      formData.append(`delete${i}`, value);
    });
    this.state.imgList.forEach((file, i) => {
      // 如果是新加的图片
      if (file.lastModifiedDate) formData.append(`file${i}`, file);
    });
    this.setState({ uploading: true });

    let r = await uploadcarouseFetch(formData);
    r.data.result === 1 ?
      message.success(r.data.msg, 2) :
      message.error(r.data.msg, 2);
    this.setState({ uploading: false, deleteList: [] });
    // TODO 刷新页面
    this.getcarouse();
  };
  // 返回false则停止自动上传
  handleBeforeInvoUpload = file => {
    console.log(file)
    if (!checkfile(file)) return true;
    this.setState(state => ({ imgList: [...state.imgList, file] }));
    return false;
  };
  // 点击预览
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  render() {
    let { previewImage, previewVisible } = this.state;

    return (
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>首页轮播</Breadcrumb.Item>
        </Breadcrumb>
        <div className='container clearfix'>
          <Upload
            imgList       // 已经选中的文件列表
            defaultFileList={this.state.imgList}
            beforeUpload={this.handleBeforeInvoUpload}    // 添加图片时触发
            onRemove={file => this.setState(state => {    // 删除
              return {
                imgList: onRemoveState(state, file),
                deleteList: [...state.deleteList, file.uid]
              }
            })}
            onPreview={this.handlePreview}                // 预览
            multiple={true}                               // 是否支持多选文件
            accept='.png, .jpg, .jpeg'                    // 接受上传的文件类型
            listType='picture-card'                       // 上传列表的内建样式
          >
            {uploadInvoButton}
          </Upload>
          <Button type='primary' onClick={this.hanleUpload}>提交</Button>
          {/* 预览模块 */}
          <Modal
            visible={previewVisible}
            footer={null}
            onCancel={() => this.setState({ previewVisible: false })}
          >
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>
      </Content>
    )
  }
}

// 上传按钮
const uploadInvoButton = (
  <div>
    <Icon type="plus" />
    <div className="ant-upload-text">Upload</div>
  </div>
);
// 限制图片大小
function checkfile(file) {
  const isLt2M = file.size / 1024 / 1024 < 5;
  if (!isLt2M) {
    message.error('超过2M限制，不允许上传~');
    return false;
  } else return true;
}
// Remove file
function onRemoveState(state, file) {
  const index = state.imgList.indexOf(file);
  const newFileList = state.imgList.slice();
  newFileList.splice(index, 1);
  console.log(newFileList)
  return newFileList;
}
// 图片解析为base64编码
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
