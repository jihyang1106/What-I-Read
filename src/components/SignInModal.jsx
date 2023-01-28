import React from 'react';
import { Modal, Input, Form } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

export default function SignInModal({ open, changeOpen }) {
  /** form 리액트 훅 */
  const [form] = Form.useForm();

  /** 폼 전송*/
  const handleSubmit = (values) => {
    console.log(values);
    alert('로그인성공!');
    handleCancel();
  };

  /** 취소버튼, x 버튼 */
  const handleCancel = () => {
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
          &nbsp;
          <Form.Item
            name="id"
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
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="아이디를 입력해주세요"
            />
          </Form.Item>
          <Form.Item
            name="password"
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
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="비밀번호를 입력해주세요"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
