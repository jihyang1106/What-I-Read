import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { Col, Row } from 'antd';
import { Button } from 'antd';
import { SignInModal } from './Modal';
import { useState } from 'react';

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
  /** 모달 창 state */
  const [open, setOpen] = useState(false);
  const changeOpen = (open) => {
    setOpen(open);
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
              <Button type="text">Join</Button>
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
