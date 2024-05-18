import { createAction, handleActions } from 'redux-actions';

// const START_PAGINATION = 'pagination/START_PAGINATION';
// const FINISH_PAGINATION = 'pagination/FINISH_PAGINATION';
const CHANGE_MENU = 'pagination/CHANGE_MENU';
const CHANGE_BLOCK_PAGE = 'pagination/CHANGE_BLOCK_PAGE';
const CHANGE_PAGE_ROW = 'pagination/CHANGE_PAGE_ROW';
const CHANGE_CURRENT_PAGE = 'pagination/CHANGE_CURRENT_PAGE';
const CHANGE_TOTAL_COUNT = 'pagination/CHANGE_TOTAL_COUNT';
const CHANGE_TOTAL_PAGE = 'pagination/CHANGE_TOTAL_PAGE';

// export const startPagination = createAction(
//   START_PAGINATION,
//   (requestType) => requestType,
// );

// export const finishPagination = createAction(
//   FINISH_PAGINATION,
//   (requestType) => requestType,
// );

// export const changeMenuAction = createAction(
//   CHANGE_MENU,
//   (menu, categoryList) => ({
//     menu,
//     categoryList,
//   }),
// );

export const changeMenuAction = createAction(
  CHANGE_MENU,
  (menu, categoryList) => ({
    menu,
    categoryList,
  }),
);

export const changeBlockPageAction = createAction(
  CHANGE_BLOCK_PAGE,
  (requestType) => requestType,
);

export const changePageRowAction = createAction(
  CHANGE_PAGE_ROW,
  (requestType) => requestType,
);

export const changeCurrentPageAction = createAction(
  CHANGE_CURRENT_PAGE,
  (requestType) => requestType,
);

export const changeTotalCountAction = createAction(
  CHANGE_TOTAL_COUNT,
  (requestType) => requestType,
);

export const changeTotalPageAction = createAction(
  CHANGE_TOTAL_PAGE,
  (requestType) => requestType,
);

// 3. 초기값 설정
const initialState = {
  menu: null, // 현재 페이징 메뉴
  blockPage: 5, // 한페이지에 보여주는 페이지 블럭 수
  pageRow: 5, // 한페이지에 보여주는 글 수
  currentPage: 1, // 현재페이지
  totalCount: null, // 전체 게시물 수
  totalPage: null, // 전체 페이지 수
  //   startCount: null, // 한 페이지에서 보여줄 게시글의 시작 번호
  //   endCount: null, // 한 페이지에서 보여줄 게시글의 끝 번호
  startPage: 1, // 시작 페이지
  endPage: null, // 마지막 페이지
};

// 4.
const pagination = handleActions(
  {
    // [START_PAGINATION]: (state, action) => ({
    //   ...state,
    //   [action.payload]: true,
    // }),
    // [FINISH_PAGINATION]: (state, action) => ({
    //   ...state,
    //   [action.payload]: false,
    // }),
    // [CHANGE_MENU]: (state, { payload: { menu } }) => ({
    //   ...state,
    //   menu: menu,
    // }),
    [CHANGE_MENU]: (state, action) => ({
      ...state,
      menu: action.payload.menu,
      totalCount: action.payload,
    }),
    [CHANGE_BLOCK_PAGE]: (state, action) => ({
      ...state,
      [action.payload]: false,
    }),
    [CHANGE_PAGE_ROW]: (state, action) => ({
      ...state,
      [action.payload]: false,
    }),
    [CHANGE_CURRENT_PAGE]: (state, action) => ({
      ...state,
      [action.payload]: false,
    }),
    [CHANGE_TOTAL_COUNT]: (state, action) => ({
      ...state,
      [action.payload]: false,
    }),
    [CHANGE_TOTAL_PAGE]: (state, action) => ({
      ...state,
      [action.payload]: false,
    }),
  },
  initialState,
);

export default pagination;
