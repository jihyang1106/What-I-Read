import React, { useState, useCallback, useEffect } from 'react';
import { Card, Button, Avatar, Popover, List, Row, Col, Skeleton } from 'antd';
import {
  RetweetOutlined,
  HeartTwoTone,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import CommentForm from '../components/CommentForm';
import CommentList from './../components/CommentList';
import '../css/post.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { recentPostCreate } from '../store/module/Post';

const post = {
  id: 1,
  User: {
    id: 1,
    nickname: '96승승',
  },
  content: '독후감 내용'.repeat(100),
  Images: [
    {
      src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
    },
    {
      src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
    },
    {
      src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
    },
  ],
  Comments: [
    {
      User: {
        nickname: 'nero',
      },
      content: '우와 개정판이 나왔군요~',
    },
    {
      User: {
        nickname: 'hero',
      },
      content: '얼른 사고싶어요~',
    },
  ],
};

/**최근 게시물 10개 요청 함수 - 한승보 */
async function recentPostRequest() {
  const data = await axios({
    method: 'post',
    url: 'http://localhost:5000/post',
  });
  console.log(data);
  return data;
}

export default function Post() {
  const [commentFormOpened, setCommentFormOpened] = useState([]);
  const [liked, setLiked] = useState(false);
  const { recentPost } = useSelector((state) => state.Post);
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
                  avatar={<Avatar>{post.User.nickname}</Avatar>}
                  title={post.User.nickname}
                  description={post.content}
                />
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs={0} sm={0} lg={4}></Col>
            <Col xs={24} sm={24} lg={12}>
              {commentFormOpened.includes(el.id) && (
                <div style={{ width: '100%' }}>
                  <CommentForm post={post} />
                  <CommentList comment={post.Comments} />
                </div>
              )}
            </Col>
          </Row>
        </div>
      ))}
    </>
  );
}
