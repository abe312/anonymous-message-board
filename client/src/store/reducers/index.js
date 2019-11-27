import errorReducer from './errorReducer';
import threadReducer from './threadReducer';
import replyReducer from './replyReducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  errors: errorReducer,
  thread: threadReducer,
  reply: replyReducer,
});

export default rootReducer;
