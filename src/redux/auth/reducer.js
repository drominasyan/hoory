import { Map } from 'immutable';
import { getToken, getUser } from '../../helpers/utility';
import { fill } from '../../helpers/utils';
import actions from './actions';

const initState = new Map({
  idToken : getToken(),
  user    : getUser(),
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
        user    : null,
      });

    case actions.AUTH_USER_DATA_REFRESH: {
      const { userData } = action.data;
      const target = state.get('user');
      const result = fill(userData, target);
      return state.set('user', result);
    }

    default:
      return state;
  }
}
