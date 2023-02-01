import React, { useState, useCallback, useEffect } from 'react';
import { Card, Button, Avatar, Popover, Row, Col } from 'antd';
import {
  HeartTwoTone,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import CommentForm from '../components/CommentForm';
import CommentList from './../components/CommentList';
import '../css/post.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { recentPostCreate } from '../store/module/Post';
import { recentCommentRemove } from './../store/module/Post';



/**최근 게시물 10개 요청 함수 - 한승보 */
async function recentPostRequest() {
  const data = await axios({
    method: 'post',
    url: 'http://localhost:5000/book/recentRecordList',
  });
  console.log(data);
  return data;
}

export default function Post() {
  const [commentFormOpened, setCommentFormOpened] = useState([]);
  const [liked, setLiked] = useState(false);
  const { recentPost } = useSelector((state) => state.Post);
  console.log(recentPost)
  
  const { nickName } = useSelector((state) => state.User.userInfo);
  const recentComment = useSelector((state) => state.Post.recentComment)
  const dispatch = useDispatch();

  useEffect(() => {
    recentPostRequest().then((data) => dispatch(recentPostCreate(data.data)));
  }, []);

  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

  /**댓글창 보여줬다 지웠다 하는 함수 : useCallback 훅으로 함수가 계속 같은 상태로 적용되어서 useCallback을 없앴다. */
  const onToggleComment = (e) => {
    if (commentFormOpened.includes(e)) {
      const arr = [...commentFormOpened];
      arr.splice(arr.indexOf(e), 1);
      setCommentFormOpened(arr);
      dispatch(recentCommentRemove(e))
      return;
    }
    const arr = [...commentFormOpened, e];
    setCommentFormOpened(arr);
  };

  return (
    <>
      {commentFormOpened.length}
      {recentPost.map((el) => (
        <div key={el.id}>
          <Row>
            <Col sm={0} lg={4}></Col>
            <Col
              sm={24}
              lg={12}
              style={{ display: 'flex', maxHeight: '400px' }}
            >
              <img src={el.cover} />
              <Card
                actions={[
                  //<RetweetOutlined key="retweet" />,
                  liked ? (
                    <HeartTwoTone
                      twoToneColor="#eb2f96"
                      key="heart"
                      onClick={onToggleLike}
                    />
                  ) : (
                    <HeartOutlined key="heart" onClick={onToggleLike} />
                  ),
                  <MessageOutlined
                    key="message"
                    onClick={() => {
                      console.log('el.id : ', el.id);
                      onToggleComment(el.id);
                    }}
                  />,
                  <Popover
                    key="ellipsis"
                    content={
                      <Button.Group>
                        <Button type="primary">1:1 대화</Button>
                        <Button type="danger">머머서재가기</Button>
                      </Button.Group>
                    }
                  >
                    <EllipsisOutlined />
                  </Popover>,
                ]}
                //extra={<FollowButton post={post} />}
              >
                <Card.Meta
                  avatar={<Avatar>{el.User.nickname}</Avatar>}
                  title={el.User.nickname}
                  description={el.content}
                />
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs={0} sm={0} lg={4}></Col>
            <Col xs={24} sm={24} lg={12}>
              {commentFormOpened.includes(el.id) && (
                <div style={{ width: '100%' }}>
                  <CommentForm BookReport_id={el.id} />
                  <CommentList BookReport_id={el.id} />
                </div>
              )}
            </Col>
          </Row>
        </div>
      ))}
    </>
  );
}
