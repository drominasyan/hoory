import { all } from 'redux-saga/effects';
// eslint-disable-next-line import/no-cycle
import usersSaga from './users/saga';
// eslint-disable-next-line import/no-cycle
import authSaga from './auth/saga';

export default function* rootSaga() {
		yield all([
			usersSaga(),
			authSaga(),
		]);
}
