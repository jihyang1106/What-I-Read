import React, { useRef, useState } from 'react';
import '../css/main.css';
import SearchInput from '../components/SearchInput';
import NewList from '../components/NewList';
import BestsellerList from '../components/BestsellerList';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import '../css/listpage.css';
export default function Main() {
  const Main = styled.main`
    background-image: url('library.jpg');
  `;

  return (
    <Main className="main">
      <div className="banner">
        <SearchInput />
      </div>
      <div class="imgLoader"></div>

      <div className="container">
        <h1 className="title">Turning pageswith css</h1>

        <div className="credit">
          * Images loaded randomly from Picsum.photos
        </div>

        <div className="book">
          <div className="gap"></div>
          <div className="pages">
            <div className="page"></div>
            <div className="page"></div>
            <div className="page"></div>
            <div className="page"></div>
            <div className="page"></div>
            <div className="page"></div>
          </div>
          <div className="flips">
            <div className="flip flip1">
              <div className="flip flip2">
                <div className="flip flip3">
                  <div className="flip flip4">
                    <div className="flip flip5">
                      <div className="flip flip6">
                        <div className="flip flip7"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1500px', margin: '0 auto', padding: '0 30px' }}>
        <BestsellerList />
        <NewList />
      </div>
    </Main>
  );
}
