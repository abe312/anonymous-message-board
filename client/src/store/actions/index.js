import { THREAD, REPLY } from '../constants';

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

const removeThread = form => ({
  type: THREAD.REMOVE,
  payload: form,
});

const setThread = data => ({
  type: THREAD.LOAD_SUCCESS_ONE,
  payload: data,
});

const setThreads = data => ({
  type: THREAD.LOAD_SUCCESS,
  payload: data,
});

export {
  postThread,
  putThread,
  getThread,
  removeThread,
  setThread,
  setThreads,
};
