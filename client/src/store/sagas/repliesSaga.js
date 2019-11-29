import { takeEvery, select, call, put, all } from 'redux-saga/effects';
import { REPLY } from '../constants';
import {
  setReplyDelete,
  setReplyPost,
  setNotificationIP,
  setNotificationR,
  setNotificationD,
  setError,
  clearErrors,
} from '../actions';
import { POST, PUT, GET, DELETE } from '../api/Reply';

function* handleReplyPost({ payload: form }) {
  try {
    const reply = yield call(POST, form);
    console.log('reply saga handle post', reply);
    yield put(setReplyPost(reply));
  } catch (e) {
    // dispatch error
    console.log(e);
  }
}

function* handleReplyPut({ payload: form }) {
  try {
    // const thread = yield call(PUT, form);
    const reply = yield call(PUT, form);
    if (reply === 'success') yield put(setNotificationR('reply'));
  } catch (e) {
    console.log(e);
  }
}

function* handleReplyGet({ payload: form }) {
  // try {
  //   yield put(clearErrors());
  //   if (form.thread_id) {
  //     const thread = yield call(get, form);
  //     if (thread) yield put(setThread(thread));
  //     else yield put(setError('thread not found'));
  //   } else {
  //     const threads = yield call(get, form);
  //     if (threads) yield put(setThreads(threads));
  //     else yield put(setError('threads not found'));
  //   }
  // } catch (e) {
  //   console.log(e);
  // }
}

function* handleReplyDelete({ payload: form }) {
  try {
    const reply = yield call(DELETE, form);
    if (reply == 'success') {
      yield put(setReplyDelete(form));
      yield put(setNotificationD('reply'));
    } else {
      yield put(setNotificationIP());
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* watchUpdatePost() {
  yield all([
    takeEvery(REPLY.POST, handleReplyPost),
    takeEvery(REPLY.PUT, handleReplyPut),
    takeEvery(REPLY.GET, handleReplyGet),
    takeEvery(REPLY.DELETE, handleReplyDelete),
  ]);
}
