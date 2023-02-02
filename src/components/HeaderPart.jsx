import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { Col, Row } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import HeaderDropdown from './HeaderDropdown';
import HeaderButtons from './HeaderButtons';
import { userInfoCreate } from '../store/module/User';

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
  const { userInfo } = useSelector((state) => state.User);
  const update = useSelector((state) => state.User.isUpdate);
  const dispatch = useDispatch();

  //const [userInfo, userInfoSet] = useState(user);
  useEffect(() => {
    console.log('HeaderPart');
    //userInfoSet(JSON.parse(window.sessionStorage.getItem('sessionUserInfo')));
    dispatch(
      userInfoCreate(
        JSON.parse(window.sessionStorage.getItem('sessionUserInfo'))
      )
    );
    //헤더는 항상 화면에 존재하니까 새로고침할 때마다 세션스토리지에 저장된거를 store의
    //userInfo에 저장한다 그러면 새로고침되도 state에 유저정보가 유지된다.
  }, [update]);

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
              {userInfo.id ? (
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
