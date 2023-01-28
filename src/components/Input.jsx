import axios from 'axios';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchListCreate } from '../store/module/Book';

export default function Search() {
  const input = useRef();
  const Dispatch = useDispatch();

  async function search() {
    const value = input.current.value;
    console.log(value);
    const data = await axios({
      method: 'get',
      url: `aladin/ttb/api/ItemSearch.aspx?ttbkey=ttb96tmdqh1639001&Query=${value}&QueryType=Title&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101`,
    });
    //console.log(data);
    Dispatch(searchListCreate(data.data.item));
    //window.location = '/user';
  }
  return (
    <div>
      <input ref={input} type="text" />
      <button
        onClick={() => {
          search();
        }}
      >
        <Link to="/user">검색</Link>
      </button>
    </div>
  );
}
