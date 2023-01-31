const initState = {
  recentPost: [],
};

//액션 타입 정의하기 : 승보
const RECENTPOST = 'post/RECENTPOST';

//액션 생성함수 작성 - reducer와 연결된 함수 : 승보
export function recentPostCreate(payload) {
  return {
    type: RECENTPOST,
    payload,
  };
}

//리듀서 : 승보
export default function post(state = initState, action) {
  switch (action.type) {
    case RECENTPOST:
      console.log(action.payload);
      return {
        ...state,
        recentPost: action.payload,
      };
    default:
      return state;
  }
}
