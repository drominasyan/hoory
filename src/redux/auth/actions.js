const actions = {
  LOGIN_REQUEST          : 'LOGIN_REQUEST',
  LOGOUT                 : 'LOGOUT',
  LOGIN_SUCCESS          : 'LOGIN_SUCCESS',
  LOGIN_ERROR            : 'LOGIN_ERROR',
  AUTH_USER_DATA_REFRESH : 'AUTH_USER_DATA_REFRESH',

  login: (authData) => ({
    type: actions.LOGIN_REQUEST,
    data: authData,
  }),
  loginSucces: (token, user) => ({
    type: actions.LOGIN_SUCCESS,
    data: {
      token,
      user,
    },
  }),
  loginError: () => ({
    type: actions.LOGIN_ERROR,
  }),
  logout: () => ({
    type: actions.LOGOUT,
  }),
  userDataRefresh: userData => ({
    type: actions.AUTH_USER_DATA_REFRESH,
    data: {
      userData,
    },
  }),
};

export default actions;
