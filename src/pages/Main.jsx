import React, { useRef, useState } from 'react';
import '../css/main.css';
import SearchInput from '../components/SearchInput';
import NewList from '../components/NewList';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import '../css/listpage.css';
export default function Main() {
  const Main = styled.main`
    background-image: url('library.jpg');
  `;

  return (
    <Main className="main" style={{height: '100vh'}}>
      <div className="banner">
        <SearchInput />
      </div>
      <div id="book">
      <section id="pageSection">
        <div class="page" id="page1">
          <h2>첫 번째 페이지...</h2>
          <span>This is first page...</span>
        </div>
    
        <div class="page" id="page2">
          <h2>두 번째 페이지...</h2>
          <span>This is second page...</span>
        </div>
      </section>
    </div>
    </Main>
  );
}
