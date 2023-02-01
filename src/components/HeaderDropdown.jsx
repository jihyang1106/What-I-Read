import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import UserUpdate from './UserUpdate';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function HeaderDropdown({ userInfo }) {
  /** UserUpdate 모달 창 state */
  const [open, setOpen] = useState(false);
  const changeOpen = (open) => {
    setOpen(open);
  };

  const { id, nickName } = userInfo;
  const navigate = useNavigate();

  /** 로그아웃 구현 */
  const [logout, setLogout] = useState(false);
  const changeLogout = (logout) => {
    setLogout(logout);
  };

  const signOut = async (id) => {
    // const data = { id: id };
    console.log('signOut 함수', logout);
    const result = await axios.delete('http://localhost:5000/auth/logout', {
      data: { id: id },
    });
    console.log(result);
    // .then((res) => {
    //   console.log(res.data);
    // if (res.data === true) {
    //   sessionStorage.removeItem('sessionUserInfo');
    //   setLogout(false);
    //   navigate('/');
    // }
    // });
  };

  // const showLogout = async (id) => {
  // // alert('로그아웃 하시겠습니까?');
  // setLogout(true);
  // const result = await axios.delete('http://localhost:5000/auth/logout', {
  //   data: id,
  // });
  // useEffect(() => {
  //   console.log('logout 변경', logout);
  // }, [logout]);

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
            changeLogout(!logout);
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
            <span style={{ fontWeight: 'bold' }}>{nickName}</span>님 안녕하세요
            :)
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
      {<UserUpdate open={open} changeOpen={changeOpen} userInfo={userInfo} />}
      {logout === true ? signOut(id) : null}
    </>
  );
}
