import actions from './actions';


const initState = {
  entities: {},
  searchValue : '',
};

export default function listReducer(state = initState, action) {
  switch (action.type) {
    case actions.LIST_REFRASH: {
      const { key, list } = action.data;
        return {
          ...state,
          entities :  {
            ...state.entities,
            [key] :list,
        },
      };
    }
    case actions.SEARCH_VALUE_REFRASH: {
      return {
          ...state,
          searchValue : action.data,
      };
    }
      default:
        return state;
    }
}
