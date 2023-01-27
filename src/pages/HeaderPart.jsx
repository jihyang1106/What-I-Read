import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { Col, Row } from 'antd';
import { Button } from 'antd';
import SignIn from './SignIn';

const { Header } = Layout;
const headerStyle = {
  color: 'black',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: 'white',
};

export default function HeaderPart() {
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
              <Button type="text">
                <SignIn />
              </Button>
            </Col>
          </Row>
        </Header>
      </Layout>
    </nav>
  );
}
