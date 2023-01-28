import React from 'react';
import HeaderPart from '../components/HeaderPart';
import { Layout } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { newListCreate, recentListCreate } from './../store/module/Book';
import { useEffect } from 'react';
import styled from 'styled-components';

const { Content } = Layout;

const contentStyle = {
  textAlign: 'center',
  height: '240px',
  lineHeight: '200px',
  color: '#fff',
  backgroundColor: 'lightgray',
  marginTop: '10px',
};

const Div = styled.div`
  display: flex;
  justify-content: space-beween;
  max-width: '1200px';
`;

export default function Main() {
  const Dispatch = useDispatch();
  const recentListState = useSelector((state) => state.Book.recentList);
  const newListState = useSelector((state) => state.Book.newList);

  async function MainPageBookListRender() {
    await axios({
      method: 'get',
      url: 'aladin/ttb/api/ItemList.aspx?QueryType=Bestseller&MaxResults=5&start=1&cover=MidBig&SearchTarget=Book&output=js&Version=20131101&ttbkey=ttb96tmdqh1639001',
    }).then((data) => {
      Dispatch(recentListCreate(data.data.item));
    });

    await axios({
      method: 'get',
      url: 'aladin/ttb/api/ItemList.aspx?QueryType=ItemNewSpecial&MaxResults=5&start=1&cover=MidBig&SearchTarget=Book&output=js&Version=20131101&ttbkey=ttb96tmdqh1639001',
    }).then((data) => {
      Dispatch(newListCreate(data.data.item));
    });
  }

  useEffect(() => {
    MainPageBookListRender();
  }, []);

  return (
    <>
      <HeaderPart />
      <Content style={contentStyle}>Content</Content>
      <Content>
        <Div>
          {recentListState.map((el) => (
            <div key={el.itemId}>
              <img src={el.cover} alt="" />
              <p>{el.title.split('-')[0]}</p>
            </div>
          ))}
        </Div>
        <Div>
          {newListState.map((el) => (
            <div key={el.itemId}>
              <img src={el.cover} alt="" />
              <p>{el.title.split('-')[0]}</p>
            </div>
          ))}
        </Div>
      </Content>
    </>
  );
}
