import React from 'react';
import Error from './pages/Error';
import Main from './pages/Main';
import SearchList from './pages/SearchList';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import HeaderPart from './components/HeaderPart';
import Post from './pages/Post';
import MyBookList from './pages/MyBookList';
import List from './pages/List';
import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.baseURL = 'http://118.67.143.160:5000';

export default function App() {
  return (
    <div className="App">
      <HeaderPart />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/list" element={<List />} />
        <Route path="*" element={<Error />} />
        <Route path="/searchList" element={<SearchList />} />
        <Route path="/post" element={<Post />} />
        <Route path="/mybookList" element={<MyBookList />} />
      </Routes>
    </div>
  );
}
