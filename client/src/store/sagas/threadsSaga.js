import { takeEvery, select, call, put, all } from 'redux-saga/effects';
import { THREAD } from '../constants';
import {
  setThread,
  setThreads,
  setError,
  clearErrors,
  setNotificationIP,
  setNotificationR,
  setNotificationD,
} from '../actions';
import { post, put as PUT, get, DELETE } from '../api/Thread';

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
    if (thread === 'success') yield put(setNotificationR('thread'));
  } catch (e) {
    console.log(e);
  }
}

function* handleThreadGet({ payload: form }) {
  try {
    yield put(clearErrors());
    if (form.thread_id) {
      const thread = yield call(get, form);
      console.log('thread', thread);
      if (thread) yield put(setThread(thread));
      else yield put(setError('thread not found'));
    } else {
      const threads = yield call(get, form);
      if (threads) yield put(setThreads(threads));
      else yield put(setError('threads not found'));
    }
  } catch (e) {
    console.log(e);
    yield put(setError('thread(s) not found'));
  }
}

function* handleThreadDelete({ payload: form, history }) {
  try {
    const thread = yield call(DELETE, form);
    if (thread === 'success') {
      history.push('/');
      yield put(setNotificationD('thread'));
    } else yield put(setNotificationIP());
  } catch (e) {
    console.log(e);
  }
}

export default function* watchUpdatePost() {
  yield all([
    takeEvery(THREAD.POST, handleThreadPost),
    takeEvery(THREAD.PUT, handleThreadPut),
    takeEvery(THREAD.GET, handleThreadGet),
    takeEvery(THREAD.DELETE, handleThreadDelete),
  ]);
}
