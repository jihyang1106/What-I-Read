import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

export default function List() {
  const bestsellerListState = useSelector((state) => state.Book.bestsellerList);
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

  return (
    <div className="one" style={{ marginTop: '300px' }}>
      {classN.map((e, i) => (
        //<div ref={obj[`div${i}`]} className={`div${i}`} key={i}>
        <img
          ref={obj[`div${i}`]}
          className={`div${i}`}
          key={i}
          src={bestsellerListState[i].cover}
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
    </div>
  );
}
