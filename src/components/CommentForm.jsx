import { Button, Form, Input } from 'antd';
import axios from 'axios';
import React, { useCallback, useState } from 'react';

const CommentForm = ({ BookReport_id }) => {
  const [commentText, setCommentText] = useState('');
  const sessionUserInfo = window.sessionStorage.getItem('sessionUserInfo');
  const userInfo = JSON.parse(sessionUserInfo); // JSON 문자열을 객체, 배열로 변환

  console.log(userInfo);

  const onSubmitComment = useCallback(async () => {
    console.log(commentText);
    const data = await axios({
      method: 'post',
      url: 'http://localhost:5000/book/comment',
      data: {
        User_id: userInfo.id,
        BookReport_id,
        comment: commentText,
      },
    });
    console.log(data);
  }, [commentText]);

  const onChangeCommentText = useCallback((e) => {
    console.log(e.target.value);
    setCommentText(e.target.value);
  }, []);

  return (
    <Form onFinish={onSubmitComment}>
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
          삐약
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CommentForm;
