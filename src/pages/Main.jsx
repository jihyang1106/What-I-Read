import React from 'react';
import '../css/main.css';
import SearchInput from '../components/SearchInput';
import NewList from '../components/NewList';
import BestsellerList from '../components/BestsellerList';
import styled from 'styled-components';

export default function Main() {
  const Main = styled.main`
    background-image: url('library.jpg');
  `;
  return (
    <Main className="main">
      <div className="banner">
        <SearchInput />
      </div>
      <div className='one'>
        <div>1</div>
        <div>2</div>
      </div>
      <div style={{ maxWidth: '1500px', margin: '0 auto', padding: '0 30px' }}>
        <BestsellerList />
        <NewList />
      </div>
    </Main>
  );
}
