import React, { useState } from 'react';
import { Button } from 'antd';
import JoinModal from './JoinModal';
import SignInModal from './SignInModal';

export default function HeaderButtons() {
  /** signIn 모달 창 state */
  const [open, setOpen] = useState(false);
  const changeOpen = (open) => {
    setOpen(open);
  };

  /** join 모달 창 state */
  const [join, setJoin] = useState(false);
  const changeJoin = (join) => {
    setJoin(join);
  };

  /** 폰트 설정 */
  const fontStyle = {
    fontFamily: 'LineSeedKR-Rg',
    fontSize: '18px',
  };
  return (
    <>
      <Button
        type="text"
        onClick={() => {
          setJoin(true);
        }}
        style={fontStyle}
      >
        Join
      </Button>
      <Button
        type="text"
        onClick={() => {
          setOpen(true);
        }}
        style={fontStyle}
      >
        SignIn
      </Button>
      {join === true ? <JoinModal join={join} changeJoin={changeJoin} /> : null}
      {open === true ? (
        <SignInModal open={open} changeOpen={changeOpen} />
      ) : null}
    </>
  );
}
