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
  /** BookDetailModal 모달 창 state */
  const [isopen, setIsOpen] = useState(false);
  const changeIsOpen = (isopen) => {
    setIsOpen(isopen);
  };

  /** 모달창에 보내기 위한 bookInfo */
  const [bookInfo, setBookInfo] = useState('');
  // localStorage에 저장한 값 가져오기
  const searchListStr = window.localStorage.getItem('searchListLocal');
  const searchListLocal = JSON.parse(searchListStr); // JSON 문자열을 객체, 배열로 변환

  return (
    <>
      <Layout style={{ background: 'light-gray' }}>
        <Content style={contentStyle}>
          <Row>
            <Col span={12} offset={6}>
              <div className="result">
                {searchListLocal.length}개의 검색결과가 있습니다.
              </div>
              <Row gutter={[40, 24]}>
                {searchListLocal.map((el, i) => (
                  <Col
                    key={el.itemId}
                    xs={24}
                    sm={24}
                    md={12}
                    lg={12}
                    xl={8}
                    xxl={8}
                  >
                    <Card
                      cover={
                        <img
                          alt={el.title.split('-')[0]}
                          src={el.cover}
                          onClick={() => {
                            changeIsOpen(true);
                            setBookInfo(el);
                          }}
                        />
                      }
                    >
                      <Meta
                        title={el.title.split('-')[0]}
                        description={
                          el.description
                            ? el.description.slice(0, 50) + '...'
                            : '설명이 없습니다.'
                        }
                      />
                    </Card>
                    <div className="bookLog">
                      <Button
                        onClick={() => {
                          changeOpen(true);
                          setBookInfo(el);
                        }}
                      >
                        기록하기
                      </Button>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Content>
      </Layout>
      {isopen === true ? (
        <BookDetailModal
          isopen={isopen}
          changeIsOpen={changeIsOpen}
          bookInfo={bookInfo}
        />
      ) : null}
      {open === true ? (
        <BookModal open={open} changeOpen={changeOpen} bookInfo={bookInfo} />
      ) : null}
    </>
  );
}
