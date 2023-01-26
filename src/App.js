import React from 'react';
import Error from './pages/Error';
import Main from './pages/Main';
import { Routes, Route } from 'react-router-dom';
import './App.css';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}
