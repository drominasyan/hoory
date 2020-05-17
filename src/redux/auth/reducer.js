import { Map } from 'immutable';
import { getToken, getUser } from '../../helpers/utility';
import { fill } from '../../helpers/utils';
import actions from './actions';

const initState = new Map({
  idToken : getToken(),
  user : getUser(),
  baseData : {},
  UI : {},
});

export default function authReducer(state = initState, action) {

  switch (action.type) {

    case actions.LOGIN_SUCCESS: {
      const { token, user } = action.data;
      return state.set('idToken', token).set('user', user);
    }

    case actions.LOGOUT:
      return new Map({
        idToken : null,
      });

    case actions.AUTH_USER_DATA_REFRESH: {
			const { baseData } = action;
			const target = state.get('baseData');
			const result = fill(baseData, target, true);
			return state.set('baseData', result);
		}

    case actions.UI_REFRESH: {
			const { UI } = action;
			const target = state.get('UI');
			const result = fill(UI, target);
			return state.set('UI', result);
		}

    default:
      return state;
  }
}
