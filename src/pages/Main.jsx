import React from 'react';
import '../css/main.css';
import SearchInput from '../components/SearchInput';
import NewList from '../components/NewList';
import BestcellerList from '../components/BestcellerList';

export default function Main() {
  return (
    <>
      <div className="banner">
        <SearchInput />
      </div>
      <div style={{ maxWidth: '1500px', margin: '0 auto', padding: '0 30px' }}>
        <BestcellerList />
        <NewList />
      </div>
    </>
  );
}
