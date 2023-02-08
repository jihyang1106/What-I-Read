import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { bestsellerListCreate } from '../store/module/Book';

export default function List() {
  const Dispatch = useDispatch();
  const bestsellerListState = useSelector((state) => state.Book.bestsellerList);

  async function MainPageBookListRender() {
    const data = await axios({
      method: 'post',
      url: '/aladin/bestSeller',
    });
    console.log(data.data);
    Dispatch(bestsellerListCreate(data.data));
  }

  useEffect(() => {
    MainPageBookListRender();
  }, []);

  const div0 = useRef();
  const div1 = useRef();
  const div2 = useRef();
  const div3 = useRef();
  const div4 = useRef();
  const div5 = useRef();
  const div6 = useRef();
  const div7 = useRef();

  const obj = {
    div0,
    div1,
    div2,
    div3,
    div4,
    div5,
    div6,
    div7,
  };
  // const arr = [div0, div1, div2, div3, div4, div5, div6, div7, div8, div9];
  let classN = ['div0', 'div1', 'div2', 'div3', 'div4', 'div5', 'div6', 'div7'];
  // const [arr1, setArr] = useState(arr);
  function change(e) {
    classN.unshift(classN.pop());
    console.log(classN);
    for (let i = 0; i < classN.length; i++) {
      obj[`div${i}`].current.className = classN[i];
    }
  }

  const [aladin, setAladin] = useState('Best Seller');
  async function list() {
    await axios({
      method: 'get',
      url: 'aladin/ttb/api/ItemList.aspx?QueryType=ItemNewSpecial&MaxResults=8&start=1&cover=MidBig&SearchTarget=Book&output=js&Version=20131101&ttbkey=ttb96tmdqh1639001',
    }).then((data) => {
      Dispatch(bestsellerListCreate(data.data.item));
    });
    setAladin('New book');
  }
  return (
    <div className="lp">
      <div className="one" style={{ marginTop: '300px' }}>
        <h1>{aladin}</h1>
        {classN.map((e, i) => (
          //<div ref={obj[`div${i}`]} className={`div${i}`} key={i}>
          <img
            ref={obj[`div${i}`]}
            className={`div${i}`}
            key={i}
            src={bestsellerListState[i]?.cover}
            alt=""
          />
          //</div>
        ))}
        <button
          style={{ marginTop: '500px' }}
          onClick={(e) => {
            change(e);
          }}
        >
          버튼
        </button>
        <button
          onClick={(e) => {
            list();
          }}
        >
          list
        </button>
      </div>
    </div>
  );
}
