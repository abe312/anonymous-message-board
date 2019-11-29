import errorReducer from './errorReducer';
import threadReducer from './threadReducer';
import notificationReducer from './notificationReducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  errors: errorReducer,
  thread: threadReducer,
  notification: notificationReducer,
});

export default rootReducer;
