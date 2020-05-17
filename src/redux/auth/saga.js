import { all, takeEvery, put, fork, call, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import find from 'lodash/find';

import langConfig from '../../containers/Topbar/LanguageSwitcher/config';

import actions from './actions';
import socketActions from '../socket/actions';
import commonActions from '../common/actions';
import currencyActions from '../currency/actions';
import sidebarActions from '../sidebar/actions';
import languageActions from '../languageSwitcher/actions';
import bannersListActions from '../banners/list/actions';

import { apiLogin } from '../../helpers/api/auth';
import { showError } from '../../helpers/notifications';
import { restoreLanguage } from '../../helpers/utility';

import { adaptUser } from './utils';

function clearLocalStorage() {
  localStorage.removeItem('id_token');
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('sidebar');
  localStorage.removeItem('language');
  localStorage.removeItem('appTabs');
  localStorage.removeItem('usersFilter');
  localStorage.removeItem('transactions');
  localStorage.removeItem('websiteID');
}

export function* loginRequest() {

  yield takeEvery(actions.LOGIN_REQUEST, function* (authData) {

    const reqData = authData.data;
    try {
      const res = yield call(apiLogin, reqData);

      if (res && res.status === 200) {
        const token = res.data.data.access_token;
        const user = adaptUser(res.data.data.user);

        yield put(actions.loginSucces(token, user));

        // loading sidebar & customized tables settings
        yield put(sidebarActions.sidebarReload());

        // loading common lists & currencies list
        yield put(commonActions.commonSportListReload());
        yield put(commonActions.commonProviderListReload());
        yield put(commonActions.commonRiskGroupListReload());
        yield put(commonActions.commonAdminListReload());
        yield put(currencyActions.currencyListReload());

        // sending a request to banners api
        yield put(bannersListActions.listReload());

        // redirect to dashboard
        yield put(push('/dashboard'));

      } else {
        yield put(actions.loginError());
      }

    } catch (error) {
      showError('Login failed', error);
      yield put(actions.loginError());
    }
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function* (action) {
    const { token, user } = action.data;

    yield localStorage.setItem('id_token', token);
    yield localStorage.setItem('user', JSON.stringify(user));

    yield applyUserLanguage(user.langID);

    yield put(socketActions.reconnect());
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function* () {
    yield call(clearLocalStorage);
    yield put(push('/signin'));
    yield put(socketActions.reconnect());
  });
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function* () {
    yield call(clearLocalStorage);
    yield put(push('/signin'));
    yield put(socketActions.reconnect());
  });
}

function* applyUserLanguage(langID) {

  const storedLanguage = yield call(restoreLanguage);
  if (storedLanguage) {
    return;
  }

  let language = find(langConfig.options, { dataBaseLangID: langID });
  if (!language) {
    language = yield select( ({ LanguageSwitcher }) => LanguageSwitcher.get('language') );
  }

  yield put(languageActions.changeLanguage(language.dataBaseLangID));
}

export default function* authSaga() {
  yield all([
    fork(loginRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(logout),
  ]);
}
