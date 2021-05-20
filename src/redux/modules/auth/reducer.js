import produce from 'immer';
import { actionTypes } from './actions';

const initialState = {
  auth: {
    isLogin: false,
    error: null,
  },
};

export const authReducer = (state = initialState, action) => {
  return produce(state, (draftState) => {
    switch (action.type) {
      case actionTypes.REQUEST_LOGIN:
        draftState.auth.isLogin = false;
        break;

      case actionTypes.REQUEST_LOGIN_SUCCESS:
        draftState.auth.isLogin = true;
        break;

      case actionTypes.REQUEST_LOGIN_FAILED:
        draftState.auth.isLogin = false;
        draftState.auth.error = action.error;
        break;

      default:
        break;
    }
  });
};
