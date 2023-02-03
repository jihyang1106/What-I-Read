import React from 'react';
import { useState, useEffect } from 'react';
import { Layout, Col, Row, Button, Card } from 'antd';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { mybookCreate } from '../store/module/Book';
import MyBookModal from '../components/MybookModal';
import '../css/searchList.css';

const { Content } = Layout;
const { Meta } = Card;

const contentStyle = {
  marginTop: '60px',
};

export default function MyBookList({ openbook, openBook }) {
  const id = JSON.parse(sessionStorage.getItem('sessionUserInfo')).id;

  const dispatch = useDispatch();
  const mybookInfo = useSelector((state) => state.Book.mybookInfo);

  const reqBookList = async () => {
    await axios
      .get('http://localhost:3000/book/mybookList', {
        params: { id: id },
      })
      .then((res) => {
        dispatch(mybookCreate(res.data));
      });
  };
  useEffect(() => {
    reqBookList();
  }, []);

  /** MybookModal 모달 창 state */
  const [open, setOpen] = useState(false);
  const changeOpen = (open) => {
    setOpen(open);
  };

  /** 모달창에 보내기 위한 bookInfo */
  const [mybook, setmybook] = useState('');
  console.log(mybookInfo.length);

  return (
    <>
      <Layout style={{ backgroundColor: 'white' }}>
        <Content style={contentStyle}>
          <Row>
            <Col span={12} offset={6}>
              <div className="result">
                {mybookInfo.length}개의 기록한 책이 있습니다.
              </div>
              <Row gutter={[40, 24]}>
                {mybookInfo.map((el, i) => (
                  <Col
                    key={el.id}
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
                          alt="mybookList"
                          src={el.cover}
                          onClick={() => {
                            changeOpen(true);
                            setmybook(el);
                          }}
                        />
                      }
                    >
                      <Meta title={el.title} />
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Content>
      </Layout>
      {open === true ? (
        <MyBookModal open={open} changeOpen={changeOpen} mybook={mybook} />
      ) : null}
    </>
  );
}
