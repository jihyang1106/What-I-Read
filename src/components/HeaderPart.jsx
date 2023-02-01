import React, { useEffect, useState } from 'react';
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
  const user = useSelector((state) => state.User.userInfo);

  /** 로그인 후 세션에 받아온 userInfo를 state에 넣기 */
  const [userInfo, userInfoSet] = useState(user);
  useEffect(() => {
    userInfoSet(JSON.parse(window.sessionStorage.getItem('sessionUserInfo')));
  }, [user]);

  /** 폰트 설정 */
  const fontStyle = {
    fontFamily: 'LineSeedKR-Bd',
    fontSize: '40px',
  };
  return (
    <nav>
      <Layout>
        <Header style={headerStyle}>
          <Row justify="space-between">
            <Col>
              <Link to="/" style={fontStyle}>
                What I Read
              </Link>
            </Col>
            <Col>
              {userInfo != null ? (
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
