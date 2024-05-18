import * as categoryAPI from '../libs/api/category';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../libs/createRequestSaga';
import { createAction, handleActions } from 'redux-actions';

const [READ_CATEGORY, READ_CATEGORY_SUCCESS, READ_CATEGORY_FAILURE] =
  createRequestActionTypes('category/READ_CATEGORY'); // createRequestActionTypes의 역할은?
const UNLOAD_CATEGORY = 'category/UNLOAD_CATEGORY';

export const categoryReadAction = createAction(READ_CATEGORY, (id) => id);
export const categoryReadUnload = createAction(UNLOAD_CATEGORY);

const readCategorySaga = createRequestSaga(
  READ_CATEGORY,
  categoryAPI.readCategory,
);

export function* categoryReadSaga() {
  yield takeLatest(READ_CATEGORY, readCategorySaga);
}

const initialState = {
  category: null,
  categoryDetails: [],
  error: null,
};

const categoryRead = handleActions(
  {
    [READ_CATEGORY_SUCCESS]: (state, { payload: category }) =>
      // { payload: category, meta: response },
      ({
        ...state,
        category,
      }),
    [READ_CATEGORY_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_CATEGORY]: () => initialState,
  },
  initialState,
);

export default categoryRead;
