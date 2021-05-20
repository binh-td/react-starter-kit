import { takeLatest, put } from 'redux-saga/effects';
import { actionTypes } from './actions';
import { saveUserLocalStorage, getUserLocalStorage, clearUserLocalStorage  } from 'services/localStorageServices';
import { isEmpty } from 'lodash';

function* login({ payload }) {
  const { username, password } = payload;
  try {
    if (username === 'don' && password === 'don') {
      yield put({ type: actionTypes.REQUEST_LOGIN_SUCCESS });
      saveUserLocalStorage({ username, isLogged: true });
    } else {
      yield put({ type: actionTypes.REQUEST_LOGIN_FAILED });
    }
  } catch (error) {
    yield put({ type: actionTypes.REQUEST_LOGIN_FAILED, error });
  }
}

function* logout() {
  try {
    clearUserLocalStorage();
    window.location.reload();
  } catch (error) {}
}

function* checkAuth() {
  const dataUser = getUserLocalStorage();
  if (!isEmpty(dataUser)) {
    yield put({ type: actionTypes.REQUEST_LOGIN_SUCCESS });
  }
}

export function* authSaga() {
  yield takeLatest(actionTypes.REQUEST_LOGIN, login);
  yield takeLatest(actionTypes.REQUEST_CHECK_AUTH, checkAuth);
  yield takeLatest(actionTypes.REQUEST_LOGOUT, logout);
}
