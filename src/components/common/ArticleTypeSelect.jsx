import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

function ArticleTypeSelect(props) {
  let seletData = [];
  if (props.seletData) seletData = props.seletData;
  else seletData = ['师大要闻', '通知公告', '党建文化', '教学科研', '学术研究', '媒体师大'];
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

export default ArticleTypeSelect
