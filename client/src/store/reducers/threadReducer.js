import { THREAD, REPLY, BOARD } from '../constants/';

const initialState = {
  threads: [],
  loading: false,
  thread: {},
  boards: [],
};
export default function(state = initialState, action) {
  switch (action.type) {
    case THREAD.LOAD: {
      return { ...state, loading: true };
    }
    case THREAD.LOAD_SUCCESS: {
      return { ...state, threads: action.payload, loading: false };
    }
    // case THREAD.LOAD_SUCCESS:
    //   return { ...state, threads: action.payload, loading: false };
    case THREAD.LOAD_SUCCESS_ONE: {
      return { ...state, loading: false, thread: action.payload };
    }

    case REPLY.SET_DELETE: {
      const newThread = state.thread;
      newThread.replies.map(reply => {
        if (reply._id == action.payload.reply_id) reply.text = '[Deleted]';
        return;
      });
      return {
        ...state,
        loading: false,
        thread: newThread,
      };
    }

    case REPLY.SET_POST: {
      return {
        ...state,
        loading: false,
        thread: action.payload,
      };
    }

    case BOARD.SET: {
      return { ...state, loading: false, boards: action.payload };
    }
    default:
      return state;
  }
}
