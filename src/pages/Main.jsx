import React from 'react';
import HeaderPart from '../components/HeaderPart';
import styled from 'styled-components';
import '../css/main.css';
import Input from '../components/Input';
import NewList from '../components/NewList';
import BestcellerList from '../components/BestcellerList';

export default function Main() {
  return (
    <>
      <div className="banner">
        <Input />
      </div>
      <div style={{ maxWidth: '1500px', margin: '0 auto', padding: '0 30px' }}>
        <BestcellerList />
        <NewList />
      </div>
    </>
  );
}
