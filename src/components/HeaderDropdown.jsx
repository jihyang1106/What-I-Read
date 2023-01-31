import React, { useState } from 'react';
import { Button, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import UserUpdate from './UserUpdate';

export default function HeaderDropdown({ userInfo }) {
  /** UserUpdate 모달 창 state */
  const [open, setOpen] = useState(false);
  const changeOpen = (open) => {
    setOpen(open);
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
      {<UserUpdate open={open} changeOpen={changeOpen} userInfo={userInfo} />}
    </>
  );
}
