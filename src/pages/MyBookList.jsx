import React from 'react';
import BookModal from '../components/BookModal';
import { useState, useEffect } from 'react';
import { Layout, Col, Row, Button, Card } from 'antd';
import axios from 'axios';

const { Content } = Layout;
const { Meta } = Card;

const contentStyle = {
  marginTop: '60px',
};

export default function MyBookList({ openbook, openBook }) {
  const id = JSON.parse(sessionStorage.getItem('sessionUserInfo')).id;

  const reqBookList = async () => {
    await axios
      .get('http://localhost:5000/book/mybookList', {
        params: { id: id },
      })
      .then((res) => {
        console.log('res.data', res.data);
      });
  };
  useEffect(() => {
    reqBookList();
  }, []);

  /** BookModal 모달 창 state */
  const [open, setOpen] = useState(false);
  const changeOpen = (open) => {
    setOpen(open);
  };

  /** 모달창에 보내기 위한 bookInfo */
  const [bookInfo, setBookInfo] = useState('');

  return (
    <>
      <Layout style={{ background: 'light-gray' }}>
        <Content style={contentStyle}>
          <Row>
            <Col span={12} offset={6}>
              <div className="result">
                {/* {searchListLocal.length}개의 검색결과가 있습니다. */}
              </div>
              <Row gutter={[40, 24]}>
                <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8}>
                  <Card
                    cover={
                      <img
                        alt="example"
                        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                        onClick={() => {
                          changeOpen(true);
                        }}
                      />
                    }
                  >
                    <Meta title="title입니다" description="설명입니다" />
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
}
