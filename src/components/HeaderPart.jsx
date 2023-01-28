import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { Col, Row } from 'antd';
import { Button } from 'antd';
import SignInModal from './SignInModal';
import { useState } from 'react';
import JoinModal from './JoinModal';

/** Header CSS */
const { Header } = Layout;

const headerStyle = {
  color: 'black',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: 'white',
};

export default function HeaderPart() {
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
    <nav>
      <Layout>
        <Header style={headerStyle}>
          <Row justify="space-between">
            <Col>
              <Link to="/">What I Read</Link>
            </Col>
            <Col>
              <Button
                type="text"
                onClick={() => {
                  setJoin(true);
                  console.log('join 버튼');
                }}
              >
                Join
              </Button>
              {join === true ? (
                <JoinModal join={join} changeJoin={changeJoin} />
              ) : null}
              <Button
                type="text"
                onClick={() => {
                  setOpen(true);
                }}
              >
                SignIn
              </Button>
              {open === true ? (
                <SignInModal open={open} changeOpen={changeOpen} />
              ) : null}
            </Col>
          </Row>
        </Header>
      </Layout>
    </nav>
  );
}
