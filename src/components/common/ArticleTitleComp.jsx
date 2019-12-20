import React from 'react';
import { Input, Tooltip, Button, Icon } from 'antd';

function ArticleTitleComp(props) {
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

export default ArticleTitleComp
