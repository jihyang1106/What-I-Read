import React, { useState } from 'react';
import { Button, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import UserUpdate from './UserUpdate';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function HeaderDropdown() {
  /** UserUpdate 모달 창 state */
  const [open, setOpen] = useState(false);
  const changeOpen = (open) => {
    setOpen(open);
  };

  /** sessionStorage에 저장한 로그인 값 가져오기 */
  const sessionUserInfo = window.sessionStorage.getItem('sessionUserInfo');
  const userInfo = JSON.parse(sessionUserInfo); // JSON 문자열을 객체, 배열로 변환
  console.log(userInfo);
  /** redux에서 닉네임, id 가져오기 */
  // const userName = useSelector((state) => state.User.nickName);
  // const userId = useSelector((state) => state.User.id);
  // console.log(userId);

  /** 회원정보 가져오기 */
  const selectUserInfo = async (userId) => {
    console.log('userId', userId);
    // const data = await axios({
    //   method: 'post',
    //   url: 'http://localhost:5000/auth/selectInfo',
    //   data: userId,
    // });
    // console.log(data);
  };

  /** 드롭다운 메뉴 */
  const items = [
    {
      label: (
        <Button
          type="none"
          onClick={() => {
            console.log('나의 서재로 이동');
          }}
        >
          나의 서재
        </Button>
      ),
      key: '0',
    },
    {
      label: (
        <Button
          type="none"
          onClick={() => {
            setOpen(true);
            selectUserInfo();
          }}
        >
          회원 정보 수정
        </Button>
      ),
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: (
        <Button
          type="none"
          onClick={() => {
            console.log('로그아웃');
          }}
        >
          로그아웃
        </Button>
      ),
      key: '3',
    },
  ];

  return (
    <>
      <Dropdown
        menu={{
          items,
        }}
        trigger={['click']}
      >
        <Button onClick={(e) => e.preventDefault()} type="text">
          <Space>
            <span style={{ fontWeight: 'bold' }}>홍길동</span>님 안녕하세요 :)
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
      {<UserUpdate open={open} changeOpen={changeOpen} />}
    </>
  );
}
