import React from 'react';
import HeaderPart from '../components/HeaderPart';
import { Layout, Col, Row, Button, Card } from 'antd';
import '../css/searchList.css';

const { Content } = Layout;
const { Meta } = Card;

const contentStyle = {
  marginTop: '60px',
};
export default function SearchList() {
  return (
    <>
      <HeaderPart />
      <Layout style={{ background: 'white' }}>
        <Content style={contentStyle}>
          <Row>
            <Col span={12} offset={6}>
              <Row gutter={[40, 24]}>
                <Col
                  xs={24}
                  sm={24}
                  md={12}
                  lg={8}
                  xl={6}
                  xxl={6}
                  style={{ padding: 10 }}
                >
                  <Card
                    cover={
                      <img
                        alt="example"
                        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                      />
                    }
                    onClick={() => {
                      console.log('이미지 클릭');
                    }}
                  >
                    <Meta
                      title="Europe Street beat"
                      description="www.instagram.com"
                    />

                    <div className="bookLog">
                      <Button
                        onClick={() => {
                          console.log('기록버튼눌림');
                        }}
                      >
                        기록하기
                      </Button>
                    </div>
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
