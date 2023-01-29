import React, { useState } from 'react';
import { Modal, Input, Form } from 'antd';
import axios from 'axios';
export default function BookModal({ open, changeOpen }) {
  /** form 리액트 훅 */
  const [form] = Form.useForm();

  /** TextArea */
  const [textarea, setTextArea] = useState('');

  /**취소 버튼, x버튼 */
  const handleCancle = () => {
    changeOpen(!open);
  };

  /** 폼 전송 */
  const handleSubmit = async (values) => {
    console.log(values);

    const data = await axios({
      method: 'post',
      url: 'http://localhost:5000/auth/login',
      data: values,
    });

    console.log(data);

    if (data) {
      alert('기록완료!');
    } else {
      alert('기록실패!');
    }
  };

  // form.setFieldsValue({
  //   title: '책제목',
  // });

  return (
    <>
      <Modal
        open={open}
        title="기록하기"
        okText="저장"
        cancelText="취소"
        onOk={form.submit}
        onCancel={handleCancle}
      >
        <hr />
        <Form
          form={form}
          onFinish={handleSubmit}
          initialValues={{
            title: '모두의 네트워크',
            author: '미즈구치 카츠야',
          }}
        >
          <Form.Item name="title" label="제목">
            <Input readOnly />
          </Form.Item>
          <Form.Item name="author" label="저자">
            <Input readOnly />
          </Form.Item>
          <Form.Item name="content" label="기록할 책 내용">
            <Input.TextArea
              value={textarea}
              onChange={(e) => setTextArea(e.target.value)}
              placeholder="기록할 내용을 입력해주세요"
              autoSize={{ minRows: 3 }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
