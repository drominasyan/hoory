import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import { history } from '../store';
import { apiLogin } from '../../helpers/api/auth';


import actions from './actions';

function clearLocalStorage() {
  localStorage.removeItem('id_token');
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export function* loginRequest() {

  yield takeEvery(actions.LOGIN_REQUEST, function* (authData) {

    const reqData = authData.data;
    try {
      const res = yield call(apiLogin, reqData);

      if (res && res.status === 200) {
        const token = res.data.data.access_token;
        const { user } = res.data.data;

        yield put(actions.loginSucces(token, user));

        // redirect to dashboard
        yield put(history.push('/dashboard'));

      } else {
        yield put(actions.loginError());
      }

    } catch (error) {
      console.log('Login failed', error);
      yield put(actions.loginError());
    }
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function* (action) {
    const { token, user } = action.data;

    yield localStorage.setItem('id_token', token);
    yield localStorage.setItem('user', JSON.stringify(user));

  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function* () {
    yield call(clearLocalStorage);
    yield put(history.push('/signin'));
  });
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function* () {
    yield call(clearLocalStorage);
    yield put(history.push('/1'));
  });
}


export default function* authSaga() {
  yield all([
    fork(loginRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(logout),
  ]);
}
