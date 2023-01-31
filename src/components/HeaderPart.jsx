import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import HeaderDropdown from './HeaderDropdown';
import HeaderButtons from './HeaderButtons';

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
  /** useSelector로 store에 있는 isLogin 가져오기 */
  const isLogin = useSelector((state) => state.User.isLogin);

  return (
    <nav>
      <Layout>
        <Header style={headerStyle}>
          <Row justify="space-between">
            <Col>
              <Link to="/">What I Read</Link>
            </Col>
            <Col>
              {isLogin === true ? <HeaderDropdown /> : <HeaderButtons />}
            </Col>
          </Row>
        </Header>
      </Layout>
    </nav>
  );
}
