import * as categoryAPI from '../libs/api/category';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../libs/createRequestSaga';
import { createAction, handleActions } from 'redux-actions';

// 1. 액션타입 정의
const [WRITE_CATEGORY, WRITE_CATEGORY_SUCCESS, WRITE_CATEGORY_FAILURE] =
  createRequestActionTypes('category/WRITE_CATEGORY');

const [EDIT_CATEGORY, EDIT_CATEGORY_SUCCESS, EDIT_CATEGORY_FAILURE] =
  createRequestActionTypes('category/EDIT_CATEGORY');

const CHANGE_CATEGORY_NAME = 'category/CHANGE_CATEGORY_NAME';
const CHANGE_CATEGORY_NOTE = 'category/CHANGE_CATEGORY_NOTE';
const SET_ORIGINAL_CATEGORY = 'category/SET_ORIGINAL_CATEGORY';
const UNLOAD_CATEGORY = 'category/UNLOAD_CATEGORY';

// 2. 액션함수 생성
export const writeCategory = createAction(
  WRITE_CATEGORY,
  // ({ category }) => ({ category }),
  ({ categoryName, note }) => ({ categoryName, note }),
);

export const categoryWriteUnload = createAction(UNLOAD_CATEGORY);

export const editCategory = createAction(
  EDIT_CATEGORY,
  ({ categoryName, note, id }) => ({ categoryName, note, id }),
);

export const setOriginalCategory = createAction(
  SET_ORIGINAL_CATEGORY,
  (category) => category,
);

const writeCategorySaga = createRequestSaga(
  WRITE_CATEGORY,
  categoryAPI.writeCategory,
);

const editCategorySaga = createRequestSaga(
  EDIT_CATEGORY,
  categoryAPI.editCategory,
);

export const changeCategoryName = createAction(
  CHANGE_CATEGORY_NAME,
  ({ category, value }) => ({
    category,
    value,
  }),
);

export const changeCategoryNote = createAction(
  CHANGE_CATEGORY_NOTE,
  ({ category, value }) => ({
    category,
    value,
  }),
);

export function* categoryWriteSaga() {
  yield takeLatest(WRITE_CATEGORY, writeCategorySaga);
  yield takeLatest(EDIT_CATEGORY, editCategorySaga);
}

// 3. 초기값 설정
const initialState = {
  // category: { categoryName: '', note: '', id: 0 },
  category: { categoryName: null, note: null, id: null },
  categoryDetails: [],
  error: null,
};

// 4.
const categoryWrite = handleActions(
  {
    [CHANGE_CATEGORY_NAME]: (state, { payload: { category, value } }) => ({
      ...state,
      category: { categoryName: value, note: category.note, id: category.id },
    }),
    [CHANGE_CATEGORY_NOTE]: (state, { payload: { category, value } }) => ({
      ...state,
      category: {
        categoryName: category.categoryName,
        note: value,
        id: category.id,
      },
    }),
    [WRITE_CATEGORY]: (state) => ({
      ...state,
      category: null,
      error: null,
    }),
    [WRITE_CATEGORY_SUCCESS]: (state, { payload: category }) => ({
      ...state,
      // category,
      category: { categoryName: null, note: null, id: null },
    }),
    [WRITE_CATEGORY_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_CATEGORY]: () => initialState,
    [SET_ORIGINAL_CATEGORY]: (state, { payload: category }) => ({
      ...state,
      category: category,
    }),
    [EDIT_CATEGORY]: (state, { payload: category }) => ({
      ...state,
      category: category,
      error: null,
    }),
    [EDIT_CATEGORY_SUCCESS]: (state, { payload: category }) => ({
      ...state,
      // category,
      category: { categoryName: null, note: null, id: null },
    }),
    [EDIT_CATEGORY_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default categoryWrite;
