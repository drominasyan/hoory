import { Map } from 'immutable';
import { fill } from '../../helpers/utils';
import actions from './actions';
import { wizardStatuses } from '../../constants/statuses';

const initState = new Map({

	entities	: {
    1 : wizardStatuses.current,
    2 : wizardStatuses.wait,
    3 : wizardStatuses.wait,
  },
	UI: {
		editMode : false,
		newWorkspace : false,
	},
});

export default function listReducer(state = initState, action) {

	switch (action.type) {

		case actions.ENTITIES_REFRESH: {
      const { data } = action;
			const target = state.get('entities');
			const result = fill(data, target);
			return state.set('entities', result);
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
