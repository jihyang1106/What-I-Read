import React from 'react';
import { Modal, Input, Form, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

export default function JoinModal({ join, changeJoin }) {
  /** form 리액트 훅 */
  const [form] = Form.useForm();

  /** 폼 전송*/
  const handleSubmit = async (values) => {
    console.log(values);
    const data = await axios({
      method: 'post',
      url: 'http://localhost:3000/auth/signup',
      data: values,
    });
    console.log(data);
    if (data.data === true) {
      alert('회원가입성공!');
      handleCancel(); //헤더에서 state 변경
    } else {
      alert(data.data);
    }
  };

  /** 취소버튼, x 버튼 */
  const handleCancel = () => {
    changeJoin(!join);
  };

  /** phone 010부분(prefix) */
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

  /**글꼴 설정 */
  const fontStyle = { fontFamily: 'LineSeedKR-Bd' };
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
            <Input placeholder="아이디를 입력해주세요" style={fontStyle} />
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
            <Input.Password />
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
            name="name"
            label="name"
            rules={[
              {
                required: true,
                message: '이름을 입력해주세요',
              },
              {
                pattern: /[a-z|A-Z|ㄱ-ㅎ|가-힣]/g,
                message: '숫자를 제외한 텍스트만 입력해주세요',
              },
            ]}
          >
            <Input placeholder="이름을 입력해주세요" style={fontStyle} />
          </Form.Item>
          <Form.Item
            name="nickname"
            label="nickname"
            rules={[
              {
                required: true,
                message: '닉네임을 입력해주세요',
              },
              {
                pattern: /[a-z|A-Z|ㄱ-ㅎ|가-힣]/g,
                message: '숫자를 제외한 텍스트만 입력해주세요',
              },
            ]}
          >
            <Input placeholder="닉네임을 입력해주세요" style={fontStyle} />
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
