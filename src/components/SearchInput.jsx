import axios from 'axios';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { searchListCreate } from '../store/module/Search';

export default function Search() {
  const input = useRef();

  const Dispatch = useDispatch();
  const navigate = useNavigate();

  async function search() {
    const value = input.current.value;
    // console.log(value);
    const data = await axios({
      method: 'get',
      url: `aladin/ttb/api/ItemSearch.aspx?ttbkey=ttb96tmdqh1639001&Query=${value}&QueryType=Title&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101`,
    });
    // console.log(data);
    await Dispatch(searchListCreate(data.data.item));

    /**객체, 배열을 JSON 문자열로 변환 한뒤 로컬 스토리지 저장*/
    const dataJSON = JSON.stringify(data.data.item);
    window.localStorage.setItem('searchListLocal', dataJSON);

    /** searchList.jsx로 페이지 이동 */
    navigate('searchList');
  }
  return (
    <div>
      <input ref={input} type="text" />
      <button
        onClick={() => {
          if (input.current.value !== '') search();
          else alert('헤이 거기 도서를 입력해주세요!');
        }}
      >
        검색
      </button>
    </div>
  );
}
