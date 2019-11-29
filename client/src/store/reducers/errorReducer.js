import { THREAD, REPLY, CLEAR_ERROR } from '../constants/';

export default function(state = null, action) {
  switch (action.type) {
    case THREAD.LOAD_FAIL:
      return action.payload;
    case CLEAR_ERROR:
      return null;
    default:
      return state;
  }
}
