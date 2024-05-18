import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import pagination from './pagination';
import categoryList, { categoryListSaga } from './categoryList';
import categoryWrite, { categoryWriteSaga } from './categoryWrite';
import categoryRead, { categoryReadSaga } from './categoryRead';

const rootReducer = combineReducers({
  categoryList,
  categoryWrite,
  categoryRead,
  loading,
  // pagination,
});

// 리듀서에 사가를 등록한다는 것은 무슨 의미?
export function* rootSaga() {
  yield all([categoryListSaga(), categoryWriteSaga(), categoryReadSaga()]);
}

export default rootReducer;
