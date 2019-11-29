import { THREAD, REPLY, CLEAR_ERROR, NOTIFICATION } from '../constants';

const postThread = form => ({
  type: THREAD.POST,
  payload: form,
});

const putThread = form => ({
  type: THREAD.PUT,
  payload: form,
});

const getThread = form => ({
  type: THREAD.GET,
  payload: form,
});

const deleteThread = (form, history) => ({
  type: THREAD.DELETE,
  payload: form,
  history: history,
});

const setThread = data => ({
  type: THREAD.LOAD_SUCCESS_ONE,
  payload: data,
});

const setThreads = data => ({
  type: THREAD.LOAD_SUCCESS,
  payload: data,
});

const setError = err => ({
  type: THREAD.LOAD_FAIL,
  payload: err,
});

const clearErrors = () => ({
  type: CLEAR_ERROR,
});

// replies
const putReply = form => ({
  type: REPLY.PUT,
  payload: form,
});
const deleteReply = form => ({
  type: REPLY.DELETE,
  payload: form,
});
const setReplyDelete = data => ({
  type: REPLY.SET_DELETE,
  payload: data,
});
const postReply = form => ({
  type: REPLY.POST,
  payload: form,
});
const setReplyPost = data => ({
  type: REPLY.SET_POST,
  payload: data,
});

const setNotificationIP = () => ({
  type: NOTIFICATION,
  payload: 'incorrect password',
});
const setNotificationR = data => ({
  type: NOTIFICATION,
  payload: data + ' report',
});
const setNotificationD = data => ({
  type: NOTIFICATION,
  payload: data + ' delete',
});

export {
  postThread,
  putThread,
  getThread,
  deleteThread,
  setThread,
  setThreads,
  setError,
  clearErrors,
  putReply,
  deleteReply,
  setReplyDelete,
  setReplyPost,
  setNotificationIP,
  setNotificationR,
  setNotificationD,
  postReply,
};
