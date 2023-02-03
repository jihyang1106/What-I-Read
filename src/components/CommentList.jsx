import { Avatar, Button, List, Skeleton } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../css/comment.css';
import { moreComment, recentCommentCreate } from '../store/module/Post';
const CommentList = ({ BookReport_id }) => {
  const dispatch = useDispatch();
  const recentComment = useSelector((state) => state.Post.recentComment).find(
    (e) => e.post_id == BookReport_id
  );
  console.log(recentComment);
  async function commentLoad() {
    const data = await axios({
      method: 'post',
      url: '/book/commentList',
      data: {
        BookReport_id,
      },
    });

    const commentdata = {
      post_id: BookReport_id,
      comment: data.data,
    };
    if (data.data.length != 0) {
      dispatch(recentCommentCreate(commentdata));
    }
  }
  useEffect(() => {
    commentLoad();
  }, []);

  const onLoadMore = async () => {
    const CommentLength = recentComment?.comment.length;
    if (CommentLength < 3) {
      alert('더 이상 댓글이 없습니다.');
      return;
    }
    const data = await axios({
      method: 'post',
      url: '/book/commentList',
      data: {
        BookReport_id,
        CommentLength,
      },
    });
    console.log(data.data);
    dispatch(moreComment({ BookReport_id, comment: data.data }));
  };
  const loadMore = (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}
    >
      <Button onClick={onLoadMore}>댓글 더보기</Button>
    </div>
  );
  return (
    <div style={{ marginTop: '35px' }}>
      <List
        className="demo-loadmore-list"
        //loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={recentComment?.comment}
        renderItem={(item) => (
          <List.Item actions={[<a key={item}>답글 달기/삭제</a>]}>
            <Skeleton avatar title={false} loading={false} active>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://w7.pngwing.com/pngs/981/645/png-transparent-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-symbol.png" />
                }
                title={<a href="https://ant.design">{item.User_id}</a>}
                description={item.comment}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
};
export default CommentList;
