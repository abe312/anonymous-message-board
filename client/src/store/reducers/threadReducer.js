import { THREAD } from '../constants/';

const initialState = {
  threads: [],
  loading: false,
  thread: {},
};
export default function(state = initialState, action) {
  switch (action.type) {
    case THREAD.LOAD: {
      return { ...state, loading: true };
    }
    // case THREAD.LOAD_SUCCESS:
    //   return { ...state, threads: action.payload, loading: false };
    case THREAD.LOAD_SUCCESS_ONE: {
      return { ...state, loading: false, thread: action.payload };
    }
    default:
      return state;
  }
}
