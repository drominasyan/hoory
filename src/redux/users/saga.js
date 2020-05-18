import { all, takeEvery, put, fork, call, select } from 'redux-saga/effects';
import { v4 as uuidv4 } from 'uuid';
import { usersAPI } from '../../helpers/api/users';
import { listToEntities, usersMockData } from '../../helpers/utils';
import { storeInStorage } from '../../helpers/utility';
// eslint-disable-next-line import/no-cycle
import { history } from '../store';
import actions from './actions';

function getUserData({ Users, Wizard }) {
	return {
		baseData  : Users.get('baseData'),
		entities  : Users.get('entities'),
		UI        : Users.get('UI'),
		editMode  : Wizard.get('UI').editMode,
		newWorkspace  : Wizard.get('UI').newWorkspace,
	};
}

function* listReload() {

  yield takeEvery(actions.USERS_LIST_RELOAD, function* () {
	const { editMode, newWorkspace } = yield select(getUserData);
    yield put(actions.uiRefresh('loading', true));
    const errorMessage = 'Loading users list failed';
	let entities;

    try {
		const res = yield call(usersAPI.usersList);
		if (res && res.status === 200) {
			entities = listToEntities(res.data.data);
		// We are using mock data here expecting resposnse is OK
		}

    } catch (error) {
      console.log(errorMessage, error);
      console.log(error);
    }
	entities = listToEntities(usersMockData);
	// We dont need to load mock data when editing or adding new workspace
	if (!editMode && !newWorkspace) {
		yield storeInStorage('users', entities);
		yield put(actions.listRefresh(entities));
	}

    yield put(actions.uiRefresh('loading', false));
  });
}

function* baseDataReload() {

	const takeAction   = actions.USER_BASE_DATA_RELOAD;
	const errorMessage = 'Loading user base data failed';
	yield takeEvery(takeAction, function* (action) {
	const { entities } = yield select(getUserData);
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
		yield put(actions.baseDataRefresh(entities[userID]));
		history.push('./1');
	});
}

function* removeUser() {

	const takeAction   = actions.REMOVE_USER_FROM_LIST;
	const errorMessage = 'Removing user failed';

	yield takeEvery(takeAction, function* (action) {
		const { entities } = yield select(getUserData);
		const { userID } = action.data;
		const newEntities = { ...entities };
		delete newEntities[userID];
		try {
		//   const res = yield call(usersAPI.removeUser, userID);
			// if (res && res.status === 200) {
		// }
		yield storeInStorage('users', newEntities);
		// We need to set the res data from removeUser in future
        yield put(actions.listRefresh(newEntities));

		} catch (error) {
			console.log(errorMessage, error);
			console.log(error);
		}
	});
}
function* editUser() {

	const takeAction   = actions.EDIT_USER_FROM_LIST;
	const errorMessage = 'Editing user failed';

	yield takeEvery(takeAction, function* () {
		const { entities, baseData } = yield select(getUserData);
		const currentData = entities[baseData.id];
		const newEntities = {
			...entities,
			[baseData.id] : {
				...currentData,
				asisName: baseData.asisName,
				colorSchema: baseData.colorSchema,
				gender: baseData.gender,
			},
		};
		try {
			yield put(actions.listRefresh(newEntities));
			yield storeInStorage('users', newEntities);

		} catch (error) {
			console.log(errorMessage, error);
			console.log(error);
		}
	});
}
function* addWorkspace() {

	const takeAction   = actions.ADD_NEW_WORKSPACE;
	const errorMessage = 'Adding workspace failed';

	yield takeEvery(takeAction, function* () {
		const { entities, baseData } = yield select(getUserData);
		const id = uuidv4();
		const newEntities = {
			...entities,
			[id] : {
				asisName: baseData.asisName,
				colorSchema: baseData.colorSchema,
				gender: baseData.gender,
				id,
			},
		};
		try {
			yield put(actions.listRefresh(newEntities));
			yield storeInStorage('users', newEntities);

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
    fork(editUser),
    fork(addWorkspace),
  ]);
}
