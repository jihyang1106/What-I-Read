import React, { useState } from 'react';
import { Modal, Input, Form } from 'antd';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function MybookModal({ open, changeOpen, mybook }) {
  /** form 리액트 훅 */
  const [form] = Form.useForm();
  const { id } = useSelector((state) => state.User.userInfo);

  const navigator = useNavigate();

  /** TextArea */
  const [textarea, setTextArea] = useState('');

  /**취소 버튼, x버튼 */
  const handleCancle = () => {
    changeOpen(!open);
  };

  /** 폼 전송 - bookInfo를 다 전달해주기 위해선 매개변수에 북인포를 전달해야해서 일단 함수를 리턴해줬다. 그 함수에 매개변수에 인풋밸류들을 넣어준다. */
  const handleSubmit = (mybook) => async (inputvalue) => {
    await axios
      .patch('http://localhost:5000/book/mybookUpdate', {
        data: { User_id: id, content: inputvalue.content, id: mybook.id },
      })
      .then((res) => {
        alert('수정되었습니다.');
        console.log('res.data', res.data);
      });
  };

  /**글꼴 설정 */
  const fontStyle = { fontFamily: 'LineSeedKR-Bd' };
  return (
    <>
      <Modal
        open={open}
        title="내가 읽은 책"
        okText="수정"
        cancelText="취소"
        onOk={form.submit}
        onCancel={handleCancle}
      >
        <hr />
        <Form
          form={form}
          onFinish={handleSubmit(mybook)}
          initialValues={{
            title: mybook.title,
            author: mybook.author,
            content: mybook.content,
          }}
        >
          <Form.Item name="title" label="제목">
            <Input readOnly style={fontStyle} />
          </Form.Item>
          <Form.Item name="author" label="저자">
            <Input readOnly style={fontStyle} />
          </Form.Item>
          <Form.Item name="content" label="기록할 책 내용">
            <Input.TextArea
              value={textarea}
              onChange={(e) => setTextArea(e.target.value)}
              placeholder="기록할 내용을 입력해주세요"
              autoSize={{ minRows: 3 }}
              style={fontStyle}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
