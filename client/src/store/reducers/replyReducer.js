const ERROR = 'ERROR';
const CLEAR_ERROR = 'CLEAR_ERROR';

export default function(state = null, action) {
  switch (action.type) {
    case ERROR:
      return action.payload;
    case CLEAR_ERROR:
      return state;
    default:
      return state;
  }
}
