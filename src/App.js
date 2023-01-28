import React from 'react';
import Error from './pages/Error';
import Main from './pages/Main';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import HeaderPart from './components/HeaderPart';
import User from './pages/User';

export default function App() {
  return (
    <div>
      <HeaderPart />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/user" element={<User />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}
