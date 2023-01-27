const initState = {
  recentList: [],
  newList: [],
};

//액션 타입 정의하기 : 승보
const RECENTLIST = 'main/RECENTLIST';
const NEWLIST = 'main/NEWLIST';

//액션 생성함수 작성 - reducer와 연결된 함수 : 승보
export function recentListCreate(payload) {
  return {
    type: RECENTLIST,
    payload, //두 개이상 데이터를 담고 있을 때 쓴다. ?는 의미?
  };
}
export function newListCreate(payload) {
  return {
    type: NEWLIST,
    payload,
  };
}

//리듀서 : 승보
export default function book(state = initState, action) {
  switch (action.type) {
    case RECENTLIST:
      return {
        ...state,
        recentList: action.payload,
      };
    case NEWLIST:
      return {
        ...state,
        newList: action.payload,
      };
    default:
      return state;
  }
}
