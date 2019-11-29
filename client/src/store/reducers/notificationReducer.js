import { NOTIFICATION } from '../constants';

export default function(state = null, action) {
  switch (action.type) {
    case NOTIFICATION:
      return action.payload + Date.now();
    default:
      return state;
  }
}
