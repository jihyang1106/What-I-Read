import React from 'react';
import { Modal, Input, Form } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userInfoCreate } from '../store/module/User';

export default function SignInModal({ open, changeOpen }) {
  /** form 리액트 훅 */
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  /** 폼 전송*/
  const handleSubmit = async (values) => {
    console.log('values', values);

    const data = await axios({
      method: 'post',
      url: '/auth/login',
      data: values,
    });
    console.log(data);

    if (data.data.id) {
      console.log(data.data);
      dispatch(userInfoCreate(data.data));
      alert('로그인 성공!');
      console.log('로그인 성공 data', data.data);

      /**객체, 배열을 JSON 문자열로 변환 한뒤 세션 스토리지에 유저 정보 저장*/
      const dataJSON = JSON.stringify(data.data);
      window.sessionStorage.setItem('sessionUserInfo', dataJSON);

      //헤더에서 state 변
    } else {
      console.log('로그인 성공 실패', data.data);
      alert(data.data);
    }
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
