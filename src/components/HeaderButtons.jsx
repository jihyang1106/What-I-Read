import React, { useState } from 'react';
import { Button } from 'antd';
import JoinModal from './JoinModal';
import SignInModal from './SignInModal';
import GlobalStyle from '../css/GlobalStyle';

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

  return (
    <>
      <GlobalStyle />
      <Button
        type="text"
        onClick={() => {
          setJoin(true);
        }}
        style={{ color: '#fff' }}
      >
        Join
      </Button>
      <Button
        type="text"
        onClick={() => {
          setOpen(true);
        }}
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
