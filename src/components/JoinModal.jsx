import React from 'react';
import { Modal, Input, Form, Select } from 'antd';
const { Option } = Select;

export default function JoinModal({ join, changeJoin }) {
  /** form 리액트 훅 */
  const [form] = Form.useForm();

  /** 폼 전송*/
  const handleSubmit = (values) => {
    console.log(values);
    alert('회원가입성공!');
    handleCancel();
  };

  /** 취소버튼, x 버튼 */
  const handleCancel = () => {
    changeJoin(!join);
  };

  const prefixSelector = (
    <Form.Item noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="010">010</Option>
      </Select>
    </Form.Item>
  );

  return (
    <>
      <Modal
        open={join}
        title="회원가입"
        okText="Join"
        cancelText="Cancel"
        onOk={form.submit}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={handleSubmit}>
          &nbsp;
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
            <Input.Password placeholder="비밀번호를 입력해주세요" />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '비밀번호를 한 번 더 입력해주세요',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('비밀번호가 달라요'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                pattern: /^(?:\d*)$/,
                message: '숫자만 입력해주세요',
              },
              {
                required: true,
                message: '전화번호를 입력해주세요',
              },
              {
                pattern: /^[\d]{0,8}$/,
                message: '010을 제외한 8자리 숫자를 입력해주세요',
              },
            ]}
          >
            <Input
              addonBefore={prefixSelector}
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
