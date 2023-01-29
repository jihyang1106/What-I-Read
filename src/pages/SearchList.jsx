import React from 'react';
import BookModal from '../components/BookModal';
import BookDetailModal from '../components/BookDetailModal';
import { useState, useEffect } from 'react';
import { Layout, Col, Row, Button, Card } from 'antd';
import '../css/searchList.css';
import { useSelector } from 'react-redux';


const { Content } = Layout;
const { Meta } = Card;


const contentStyle = {
  marginTop: '60px',
};


export default function SearchList() {
  const searchList = useSelector((state) => state.Book.searchList)

  function bookRecord(book){
    
  }

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
                {searchList.map((el, i) => (
                  <Col key={el.itemId} xs={24} sm={24} md={12} lg={8} xl={6} xxl={6}>
                   <Card
                     cover={
                       <img
                         alt="example"
                         src={el.cover}
                         onClick={() => {
                           changeIsOpen(true);
                         }}
                       />
                     }
                   >
                     <Meta
                       title={el.title.split('-')[0]}
                       description={el.description.slice(0,50)+'.....'}
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
        />
      ) : null}
{open === true ? (
  <BookModal open={open} changeOpen={changeOpen} />
) : null}
    </>
  );
}
