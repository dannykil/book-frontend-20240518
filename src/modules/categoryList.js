import * as categoryAPI from '../libs/api/category';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../libs/createRequestSaga';
import { createAction, handleActions } from 'redux-actions';
import debug from 'debug';
const authLogger = debug('auth');

// 1. Category 액션타입 정의
const [LIST_CATEGORY, LIST_CATEGORY_SUCCESS, LIST_CATEGORY_FAILURE] =
  createRequestActionTypes('category/LIST_CATEGORY'); // createRequestActionTypes의 역할은?

const CHANGE_CURRENT_PAGE = 'category/CHANGE_CURRENT_PAGE';
const SEARCH_LIST_CATEGORY = 'category/SEARCH_LIST_CATEGORY';

// 2. 액션함수 생성
export const categoryListAction = createAction(
  LIST_CATEGORY,
  // console.log('hi'),
  // ({ tag, username, page }) => ({ tag, username, page }),
  // ({ page }) => ({ page }),
);

export const changeCurrentPageAction = createAction(
  CHANGE_CURRENT_PAGE,
  (page) => page,
);

export const searchCategoryListAction = createAction(
  SEARCH_LIST_CATEGORY,
  (search) => search,
);

const listCategorySaga = createRequestSaga(
  LIST_CATEGORY,
  categoryAPI.listCategory,
);

export function* categoryListSaga() {
  authLogger('categorySaga Start');
  yield takeLatest(LIST_CATEGORY, listCategorySaga);
}

// 3. 초기값 설정
const initialState = {
  categories: null,
  error: null,
  // originalCategoryId: null,
  // lastPage: 1,
  pagination: {
    blockPage: 5,
    pageRow: 5,
    currentPage: 1,
    totalCount: null,
    totalPage: null,
    startBlock: 1,
    endBlock: 5,
    startPage: 1,
    endPage: 5,
  },
  search: { categoryName: null, insertDT: null },
};
// blockPage: 5, // 한페이지에 보여주는 페이지 블럭 수
//   pageRow: 5, // 한페이지에 보여주는 글 수
//   currentPage: 1, // 현재페이지
//   totalCount: null, // 전체 게시물 수
//   totalPage: null, // 전체 페이지 수
//   //   startCount: null, // 한 페이지에서 보여줄 게시글의 시작 번호
//   //   endCount: null, // 한 페이지에서 보여줄 게시글의 끝 번호
//   startPage: 1, // 시작 페이지
//   endPage: null, // 마지막 페이지

// 4.
const categoryList = handleActions(
  {
    // payload를 중괄호없이 선언하면?
    [LIST_CATEGORY_SUCCESS]: (
      state,
      { payload: categories, meta: response },
    ) => ({
      ...state,
      categories,
      pagination: {
        blockPage: 5,
        pageRow: 5,
        currentPage: 1,
        totalCount: response.data.length,
        totalPage: Math.ceil(response.data.length / 5),
        startBlock: 1,
        endBlock: 5,
        startPage: 1,
        endPage: 5,
      },
      // lastPage: parseInt(response.headers['last-page'], 10),
    }),
    [LIST_CATEGORY_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [CHANGE_CURRENT_PAGE]: (state, { payload: page }) => ({
      ...state,
      pagination: {
        blockPage: 5,
        pageRow: 5,
        currentPage: page,
        totalCount: state.pagination.totalCount,
        totalPage: state.pagination.totalPage,
        startBlock: Math.ceil(page / 5) * 5 - 4,
        endBlock: Math.ceil(page / 5) * 5,
        startPage: (page - 1) * 5 + 1,
        endPage: (page - 1) * 5 + 5,
      },
    }),
    [SEARCH_LIST_CATEGORY]: (state, { payload: categoryName }) => ({
      ...state,
      search: {
        categoryName: categoryName,
      },
    }),
  },
  initialState,
);

export default categoryList;
