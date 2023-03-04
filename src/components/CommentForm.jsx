import { Button, Form, Input } from 'antd';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../store/module/Post';
import secureLocalStorage from 'react-secure-storage';

const CommentForm = ({ BookReport_id }) => {
  console.log('commentForm렌더됨');
  const [commentText, setCommentText] = useState('');
  const sessionUserInfo = secureLocalStorage.getItem('sessionUserInfo');
  const userInfo = JSON.parse(sessionUserInfo); // JSON 문자열을 객체, 배열로 변환
  const dispatch = useDispatch();

  const onSubmitComment = useCallback(async () => {
    if (!userInfo?.id) {
      return alert('로그인 후 입력하세요');
    }
    console.log(commentText);
    const data = await axios({
      method: 'post',
      url: '/book/comment',
      data: {
        User_id: userInfo.id,
        BookReport_id,
        comment: commentText,
      },
    });
    console.log(data.data);
    console.log({ BookReport_id, comment: data.data });
    dispatch(addComment({ BookReport_id, comment: data.data }));
  }, [commentText]);

  const onChangeCommentText = useCallback((e) => {
    console.log(e.target.value);
    setCommentText(e.target.value);
  }, []);

  return (
    <>
      <Form onFinish={onSubmitComment} style={{ width: '80%' }}>
        <Form.Item style={{ position: 'relative', margin: 0 }}>
          <Input.TextArea
            rows={4}
            value={commentText}
            onChange={onChangeCommentText}
          />
          <Button
            style={{ position: 'absolute', right: 0, bottom: -40 }}
            type="primary"
            htmlType="submit"
          >
            작성
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CommentForm;
