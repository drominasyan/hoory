import { Map } from 'immutable';
import { fill } from '../../helpers/utils';
import actions from './actions';

const initState = new Map({

	entities	: {},
	baseData    : {
		colorSchema : 1,
		gender		: 'female',
	},


	UI: {
		loading: false,
	},
});

export default function listReducer(state = initState, action) {

	switch (action.type) {

		case actions.USERS_LIST_REFRESH: {
			return state.set('entities', action.data);
		}

		case actions.USER_BASE_DATA_REFRESH: {
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
