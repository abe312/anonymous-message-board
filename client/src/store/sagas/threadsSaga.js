import { takeEvery, select, call, put, all } from 'redux-saga/effects';
import { THREAD } from '../constants';
import { setThread } from '../actions';
import { post, put as PUT, get, remove } from '../api/Thread';

function* handleThreadPost({ payload: form }) {
  try {
    // const action = yield takeEvery(THREAD.POST);
    const thread = yield call(post, form);
    // yield put(setThreads)
  } catch (e) {
    // dispatch error
    console.log(e);
  }
}

function* handleThreadPut({ payload: form }) {
  try {
    const thread = yield call(PUT, form);
  } catch (e) {
    console.log(e);
  }
}

function* handleThreadGet({ payload: form }) {
  try {
    const thread = yield call(get, form);
    if (form.thread_id) yield put(setThread(thread));
  } catch (e) {
    console.log(e);
  }
}

function* handleThreadRemove({ payload: form }) {
  try {
    const thread = yield call(remove, form);
  } catch (e) {
    console.log(e);
  }
}

export default function* watchUpdatePost() {
  yield all([
    takeEvery(THREAD.POST, handleThreadPost),
    takeEvery(THREAD.PUT, handleThreadPut),
    takeEvery(THREAD.GET, handleThreadGet),
    takeEvery(THREAD.REMOVE, handleThreadRemove),
  ]);
}
