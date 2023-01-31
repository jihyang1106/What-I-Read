const initState = {
  searchList: [],
};

//액션 타입 정의하기 : 승보
const SEARCHLIST = 'main/SEARCHLIST';

//액션 생성함수 작성 - reducer와 연결된 함수 : 승보
export function searchListCreate(payload) {
  return {
    type: SEARCHLIST,
    payload,
  };
}

//리듀서 : 승보
export default function search(state = initState, action) {
  switch (action.type) {
    case SEARCHLIST:
      return {
        ...state,
        searchList: action.payload,
      };
    default:
      return state;
  }
}
