const initState = {
  recentPost: [],
  recentComment: [],
};

//액션 타입 정의하기 : 승보
const RECENTPOST = 'post/RECENTPOST';
const RECENTCOMMENT = 'post/RECENTCOMMENT';
const REMOVERECENTCOMMENT = 'post/REMOVERECENTCOMMENT';
const ADDCOMMENT = 'post/ADDCOMMENT';
const MORECOMMENT = 'post/MORECOMMENT';

//액션 생성함수 작성 - reducer와 연결된 함수 : 승보
export function recentPostCreate(payload) {
  return {
    type: RECENTPOST,
    payload,
  };
}
export function recentCommentCreate(payload) {
  return {
    type: RECENTCOMMENT,
    payload,
  };
}
export function recentCommentRemove(payload) {
  return {
    type: REMOVERECENTCOMMENT,
    payload,
  };
}
export function addComment(payload) {
  return {
    type: ADDCOMMENT,
    payload,
  };
}

export function moreComment(payload) {
  return {
    type: MORECOMMENT,
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
    case RECENTCOMMENT:
      console.log('state : ', state);
      console.log('payload : ', action.payload);

      return {
        ...state,
        recentComment: [...state.recentComment, action.payload],
      };
    case REMOVERECENTCOMMENT:
      console.log(action.payload);
      const newArr = state.recentComment.filter(
        (e) => e.post_id !== action.payload
      );
      console.log(newArr);
      return {
        ...state,
        recentComment: newArr,
      };
    case ADDCOMMENT:
      console.log(action.payload);
      console.log(state.recentComment);
      console.log(
        state.recentComment.filter(
          (e) => e.post_id == action.payload.BookReport_id
        ).length
      );
      const arr =
        state.recentComment.filter(
          (e) => e.post_id == action.payload.BookReport_id
        ).length == 0
          ? [
              ...state.recentComment,
              {
                post_id: action.payload.BookReport_id,
                comment: [action.payload.comment],
              },
            ]
          : state.recentComment?.map((e) => {
              if (e.post_id === action.payload.BookReport_id) {
                return {
                  post_id: e.post_id,
                  comment: [action.payload.comment, ...e.comment],
                };
              }
              return e;
            });
      //게시믈id를 찾고 그 게시물 객체 안에다가 댓글객체에 추가한다.
      console.log(arr);
      return {
        ...state,
        recentComment: arr,
      };
    case MORECOMMENT:
      console.log(action.payload);
      const moreComment = state.recentComment?.map((e) => {
        if (e.post_id === action.payload.BookReport_id) {
          return {
            post_id: e.post_id,
            comment: [...action.payload.comment, ...e.comment],
          };
        }
        return e;
      });
      console.log(moreComment);
      return {
        ...state,
        recentComment: moreComment,
      };
    default:
      return state;
  }
}
