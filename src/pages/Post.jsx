
import React, { useState, useCallback,useEffect } from 'react';
import { Card, Button, Avatar, Popover, List, Row, Col,Skeleton } from 'antd';
import { RetweetOutlined, HeartTwoTone, HeartOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import CommentForm from '../components/CommentForm';
import CommentList from './../components/CommentList';
import '../css/post.css'

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;


const post = {
  id: 1,
  User: {
    id: 1,
    nickname: '96승승',
  },
  content: '독후감 내용'.repeat(100),
  Images: [{
    src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
  }, {
    src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
  }, {
    src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
  }],
  Comments: [{
    User: {
      nickname: 'nero',
    },
    content: '우와 개정판이 나왔군요~',
  }, {
    User: {
      nickname: 'hero',
    },
    content: '얼른 사고싶어요~',
  }]
}

export default function Post() {
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [liked, setLiked] = useState(false);

  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);



  return (
    <>
    <Row>
      <Col md={0} lg={4} >
      </Col>
      <Col md={24} lg={12} style={{display:'flex', maxHeight:'400px'}}>
      <img src={post.Images[1].src} />
      <Card
         
           actions={[
             //<RetweetOutlined key="retweet" />,
             liked
               ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike} />
               : <HeartOutlined key="heart" onClick={onToggleLike} />,
             <MessageOutlined key="message" onClick={onToggleComment} />,
             <Popover
               key="ellipsis"
               content={(
                 <Button.Group>
                   <Button type='primary'>1:1 대화</Button>
                   <Button type='danger'>머머서재가기</Button>
                 </Button.Group>
               )}
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
        <Col xs={0} lg={4}></Col>
        <Col xs={24} lg={12}>
         {commentFormOpened && <div style={{width:'100%'}}>
            <CommentForm post={post} />
            <CommentList comment ={post.Comments} />
          </div>}
        </Col>
      </Row>
      
    </>
  )
}
