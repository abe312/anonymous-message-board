import { all } from 'redux-saga/effects';

import threadsSaga from './threadsSaga';
import repliesSaga from './repliesSaga';

export default function* rootSaga() {
  yield all([threadsSaga(), repliesSaga()]);
}
