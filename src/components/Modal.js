import React from 'react';
import { Modal, Input, Form } from 'antd';

export function SignInModal({ open, changeOpen }) {
  /** form 리액트 훅 */
  const [form] = Form.useForm();

  /** 폼 전송*/
  const handleSubmit = (values) => {
    console.log(values);
    alert('로그인성공!');
    handleCancel();
  };

  /** 취소  */
  const handleCancel = () => {
    console.log(open);
    changeOpen(!open);
  };

  return (
    <>
      <Modal
        open={open}
        title="로그인"
        okText="SignIn"
        cancelText="Cancel"
        onOk={form.submit}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="id"
            label="ID"
            rules={[
              {
                type: 'email',
                message: '이메일 형식으로 입력해주세요',
              },
              {
                required: true,
                message: '아이디를 입력해주세요',
              },
            ]}
          >
            <Input placeholder="아이디를 입력해주세요" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                pattern: /^[a-zA-Z]+[0-9]+$/,
                message: '영어와 숫자 조합으로',
              },
              {
                required: true,
                message: '비밀번호를 입력해주세요',
              },
            ]}
            hasFeedback
          >
            <Input placeholder="비밀번호를 입력해주세요" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
