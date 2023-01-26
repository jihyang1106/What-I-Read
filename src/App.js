import React from 'react';
import Header from './pages/Header';
import Main from './pages/Main';
import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />} />
      </Routes>
      <Main />
    </>
  );
}
