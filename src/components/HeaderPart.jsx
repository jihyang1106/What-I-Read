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
  /** sessionStorage에 저장한 로그인 값 가져오기 */
  const userInfo = JSON.parse(window.sessionStorage.getItem('sessionUserInfo'));
  // JSON 문자열을 객체, 배열로 변환

  return (
    <nav>
      <Layout>
        <Header style={headerStyle}>
          <Row justify="space-between">
            <Col>
              <Link to="/">What I Read</Link>
            </Col>
            <Col>
              {userInfo !== null ? (
                <HeaderDropdown userInfo={userInfo} />
              ) : (
                <HeaderButtons />
              )}
            </Col>
          </Row>
        </Header>
      </Layout>
    </nav>
  );
}
