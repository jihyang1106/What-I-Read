const initState = {
  bestsellerList: [],
  newList: [],
  mybookInfo: [],
};

//액션 타입 정의하기 : 승보
const BESTSELLER = 'book/BESTSELLER';
const NEWLIST = 'book/NEWLIST';
const MYBOOKINFO = 'book/MYBOOKINFO';
const MYBOOKUPDATE = 'book/MYBOOKUPDATE';

//액션 생성함수 작성 - reducer와 연결된 함수 : 승보
export function bestsellerListCreate(payload) {
  return {
    type: BESTSELLER,
    payload, //두 개이상 데이터를 담고 있을 때 쓴다. ?는 의미?
  };
}

export function newListCreate(payload) {
  return {
    type: NEWLIST,
    payload,
  };
}

export function mybookCreate(payload) {
  return {
    type: MYBOOKINFO,
    payload,
  };
}

export function mybookUpdate(payload) {
  return {
    type: MYBOOKUPDATE,
    payload,
  };
}

//리듀서
export default function book(state = initState, action) {
  switch (action.type) {
    case BESTSELLER:
      return {
        ...state,
        bestsellerList: action.payload,
      };
    case NEWLIST:
      return {
        ...state,
        newList: action.payload,
      };
    case MYBOOKINFO:
      return {
        ...state,
        mybookInfo: action.payload,
      };
    case MYBOOKUPDATE:
      console.log('action.payload', action.payload);
      let newArr = state.mybookInfo.map((e) => {
        if (action.payload.id === e.id) {
          e = { ...e, content: action.payload.content };
        }
        return e;
      });
      return {
        ...state,
        mybookInfo: newArr,
      };
    default:
      return state;
  }
}

// case REMOVERECENTCOMMENT:
//   console.log(action.payload);
//   const newArr = state.recentComment.filter(
//     (e) => e.post_id !== action.payload
//   );
//   console.log(newArr);
//   return {
//     ...state,
//     recentComment: newArr,
//   };
