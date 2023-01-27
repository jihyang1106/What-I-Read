import React from 'react';
import HeaderPart from './HeaderPart';
import { Layout } from 'antd';
import { useDispatch, useSelector,  } from 'react-redux';
import axios from 'axios';
import { newListCreate, recentListCreate } from './../store/module/Book';
import {useEffect} from 'react'

const { Content } = Layout;

const contentStyle = {
  textAlign: 'center',
  height: '240px',
  lineHeight: '200px',
  color: '#fff',
  backgroundColor: 'lightgray',
  marginTop: '10px',
};

export default function Main() {

  const Dispatch = useDispatch();
  const recentListState = useSelector((state)=> state.Book.recentList)
  const newListState = useSelector((state)=> state.Book.newList)


  async function MainPageBookListRender() {
    await axios({
      method: "get",
      url: "aladin/ttb/api/ItemList.aspx?QueryType=Bestseller&MaxResults=5&start=1&cover=MidBig&SearchTarget=Book&output=js&Version=20131101&ttbkey=ttb96tmdqh1639001",
    }).then((data) => {
      Dispatch(recentListCreate(data.data.item))
    })


    await axios({
      method: "get",
      url: "aladin/ttb/api/ItemList.aspx?QueryType=ItemNewSpecial&MaxResults=5&start=1&cover=MidBig&SearchTarget=Book&output=js&Version=20131101&ttbkey=ttb96tmdqh1639001",
    }).then((data) => {
      Dispatch(newListCreate(data.data.item))
    })
  }
  
  useEffect(() => {
    MainPageBookListRender();
  }, []);

  return (
    <>
      <HeaderPart />
      <Content style={contentStyle}>Content</Content>
      <div style={{display:'flex', justifyContent:'space-between', maxWidth: '1200px'}}>
      {recentListState.map((el)=>(
        <div key={el.itemId}>
          <img src={el.cover} alt=""/>
          <p>{el.title.split('-')[0]}</p>
        </div>
       
      ))}
    </div>
    <div style={{display:'flex', justifyContent:'space-between', maxWidth: '1200px'}}>
      {newListState.map((el)=>(
        <div key={el.itemId}>
          <img src={el.cover} alt=""/>
          <p>{el.title.split('-')[0]}</p>
        </div>
       
      ))}
    </div>
    </>
  );
}
