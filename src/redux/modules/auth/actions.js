export const actionTypes = {
    REQUEST_LOGIN: '[AUTH] REQUEST_LOGIN',
    REQUEST_LOGIN_SUCCESS: '[AUTH] REQUEST_LOGIN_SUCCESS',
    REQUEST_LOGIN_FAILED: '[AUTH] REQUEST_LOGIN_FAILED',
    REQUEST_CHECK_AUTH: '[AUTH] REQUEST_CHECK_AUTH',
    REQUEST_LOGOUT: '[AUTH] REQUEST_LOGOUT',
}

export const login = (username, password) => ({
  type: actionTypes.REQUEST_LOGIN,
  payload: {
    username,
    password,
  },
});

export const checkAuth = () => ({
  type: actionTypes.REQUEST_CHECK_AUTH,
});

export const logout = () => ({
  type: actionTypes.REQUEST_LOGOUT,
});
