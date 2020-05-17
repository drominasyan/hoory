import { all, takeEvery, put, fork, call, select } from 'redux-saga/effects';
import { removeUserFromList } from './utils';
import { usersAPI } from '../../helpers/api/users';

import actions from './actions';

function getUserData({ Users }) {
  console.log(Users);
	return {
		baseData    : Users.get('baseData'),
		entities    : Users.get('entities'),
		UI          : Users.get('UI'),
	};
}

function* listReload() {

  yield takeEvery(actions.USERS_LIST_RELOAD, function* () {

    yield put(actions.setValueUI('loading', true));
    const errorMessage = 'Loading users list failed';


    try {
      const res = yield call(usersAPI.usersList);
      if (res && res.status === 200) {
        yield put(actions.listRefresh(res.data.data));
      }

    } catch (error) {
      console.log(errorMessage, error);
      console.log(error);
    }

    yield put(actions.setValueUI('loading', false));
  });
}

function* baseDataReload() {

	const takeAction   = actions.USER_BASE_DATA_RELOAD;
	const errorMessage = 'Loading user base data failed';

	yield takeEvery(takeAction, function* (action) {
		const { userID } = action.data;
		const params     = { id : userID };
		try {
			const res = yield call(usersAPI.usersList, params);
			if (res && res.status === 200) {
        yield put(actions.baseDataRefresh(res.data.data));
      }

		} catch (error) {
			console.log(errorMessage, error);
			console.log(error);
		}
	});
}

function* removeUser() {

	const takeAction   = actions.USER_BASE_DATA_RELOAD;
	const errorMessage = 'Removing user failed';
  const { entities } = yield select(getUserData);

	yield takeEvery(takeAction, function* (action) {
		const { userID } = action.data;
		try {
      const res = yield call(usersAPI.removeUser, userID);
      // We need to set the res data from removeUser in future
        const newEntities = removeUserFromList(entities, userID);
        yield put(actions.listRefresh(newEntities));
			// if (res && res.status === 200) {
      // }

		} catch (error) {
			console.log(errorMessage, error);
			console.log(error);
		}
	});
}

export default function* listSaga() {
  yield all([
    fork(listReload),
    fork(baseDataReload),
    fork(removeUser),
  ]);
}
