import React, { useRef, useEffect, useState } from 'react';
import { Comment, List, Icon, Spin } from 'antd';

import { getcommentFetch, getcommentcountFetch } from '../../services/commentFetch';

const LIMIT = 1;     // 每次加载的评论条数
let UNMOUT = true;   // 组件是否卸载

export default function ArticleComment(props) {
  let { handleDelete, news_id } = props;

  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(999);  // 评论总数
  const [data, setData] = useState([]);     // 评论数据
  const [end, setEnd] = useState(0);        // 最后一条评论index
  const [observer, setObserver] = useState(null);
  const $bottomElement = useRef();          // 监听的节点

  // 获取评论总数、LIMIT条评论，都只获取一次
  useEffect(() => {
    const countFetch = async () => {
      let r = await getcommentcountFetch({ news_id });
      if (UNMOUT) {
        setCount(r.data)
        updateData();
      }
    }
    countFetch();
    return () => UNMOUT = false;
  }, []);

  useEffect(() => {
    intiateScrollObserver();
    return () => resetObservation();
  }, [end]);

  // 定义观察
  const intiateScrollObserver = () => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    const Observer = new IntersectionObserver(callback, options);
    // 观察结尾的元素
    if ($bottomElement.current) Observer.observe($bottomElement.current);
    // 设初始值
    setObserver(Observer);
  }

  const callback = (entries, observer) => {
    entries.forEach((entry, index) => {
      let ifLoad = data.length < count;
      if (ifLoad) setLoading(true);
      else setLoading(false);
      if (entry.isIntersecting && entry.target.id === "bottom" && ifLoad) {
        updateData();
      }
    });
  }

  const updateData = async () => {
    console.log(end)
    let loadData = await loadCommont();
    setEnd(end + LIMIT);

    console.log('nowData: ', data)
    let newData = loadData.map(item => {
      return {
        actions: [<span onClick={() => handleDelete(item)} key="comment-list-reply-to-0">delete</span>],
        author: item.user_name,
        avatar: <Icon type='user' />,
        content: (<p>{item.comment_content}</p>),
        datetime: (
          <span>{item.comment_time}</span>
        ),
      };
    });
    setData(data.concat(newData));
    console.log('newData: ', data)
  }

  // 加载数据
  const loadCommont = async () => {
    console.log('end: ' + end)
    let r = await getcommentFetch({ news_id, end, limit: LIMIT });
    let loadData = r.data;
    console.log('loadData: ', loadData)
    return loadData;
  }

  // 停止滚动时放弃观察
  const resetObservation = () => observer && observer.unobserve($bottomElement.current);

  return (
    <>
      <h5 className='output-title'>评论管理</h5>
      <List
        className="comment-list"
        header={`已加载评论 ${data.length} 条，共${count}条`}
        itemLayout="horizontal"
        dataSource={data}
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
      {loading ?
        (
          <div
            style={{ minHeight: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Spin size='default' />
          </div>
        ) : null}
      <h2 id='bottom' ref={$bottomElement}>已经到底了！</h2>
    </>
  )
}
