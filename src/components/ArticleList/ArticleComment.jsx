import React from 'react';
import { Comment, List, Icon } from 'antd';

export default function ArticleComment(props) {
  let { data, handleDelete } = props;
  let d = [];
  data.forEach(item => {
    d.push({
      actions: [<span onClick={() => handleDelete(item)} key="comment-list-reply-to-0">delete</span>],
      author: item.user_name,
      avatar: <Icon type='user' />,
      content: (<p>{item.comment_content}</p>),
      datetime: (
        <span>{item.comment_time}</span>
      ),
    });
  });

  return (
    <div>
      <h5 className='output-title'>评论管理</h5>
      <List
        className="comment-list"
        header={`共 ${d.length} 条`}
        itemLayout="horizontal"
        dataSource={d}
        renderItem={item => (
          <li>
            <Comment
              actions={item.actions}
              author={item.author}
              avatar={item.avatar}
              content={item.content}
              datetime={item.datetime}
            />
          </li>
        )}
      />
    </div>
  )
}
