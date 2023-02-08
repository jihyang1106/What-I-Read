import React, { useState } from 'react';
import { Button, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import UserUpdate from './UserUpdate';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import GlobalStyle from '../css/GlobalStyle';
import { userInfoDelete } from '../store/module/User';

export default function HeaderDropdown({ userInfo }) {
  /** UserUpdate 모달 창 state */
  const [open, setOpen] = useState(false);
  const changeOpen = (open) => {
    setOpen(open);
  };

  /**유저 정보 */
  const { id, nickName } = userInfo;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /** 로그아웃 state */
  const changeLogOut = () => {
    sessionStorage.removeItem('sessionUserInfo');
    sessionStorage.clear();
    alert('로그아웃 되었습니다.');
    dispatch(userInfoDelete());
    navigate('/');
  };

  /** 드롭다운 메뉴 */
  const items = [
    {
      label: (
        <Button
          type="none"
          onClick={() => {
            navigate('/mybookList');
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
            changeLogOut();
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
      <GlobalStyle />
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
    </>
  );
}
