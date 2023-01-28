import React from 'react';
import BookModal from '../components/BookModal';
import BookDetailModal from '../components/BookDetailModal';
import { useState } from 'react';
import { Layout, Col, Row, Button, Card } from 'antd';
import '../css/searchList.css';

const { Content } = Layout;
const { Meta } = Card;

const contentStyle = {
  marginTop: '60px',
};
export default function SearchList() {
  /** BookModal 모달 창 state */
  const [open, setOpen] = useState(false);
  const changeOpen = (open) => {
    setOpen(open);
  };
  /** BookDetailModal */
  const [isopen, setIsOpen] = useState(false);
  const changeIsOpen = (isopen) => {
    setIsOpen(isopen);
  };

  return (
    <>
      <Layout style={{ background: 'white' }}>
        <Content style={contentStyle}>
          <Row>
            <Col span={12} offset={6}>
              <Row gutter={[40, 24]}>
                <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={6}>
                  <Card
                    cover={
                      <img
                        alt="example"
                        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                        onClick={() => {
                          changeIsOpen(true);
                        }}
                      />
                    }
                  >
                    {isopen === true ? (
                      <BookDetailModal
                        isopen={isopen}
                        changeIsOpen={changeIsOpen}
                      />
                    ) : null}
                    <Meta
                      title="모두의 네트워크"
                      description="초보자와 비전공자를 위한 가장 쉬운 네트워크 입문서 [모두의 네트워크]는 이제 막 네트워크를 공부하기 시작했거나 공부해야겠다고 마음먹은 초급자를 대상으로 한 입문서다."
                    />
                  </Card>
                  <div className="bookLog">
                    <Button
                      onClick={(event) => {
                        changeOpen(true);
                        event.stopPropagation();
                      }}
                    >
                      기록하기
                    </Button>
                    {open === true ? (
                      <BookModal open={open} changeOpen={changeOpen} />
                    ) : null}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
}
