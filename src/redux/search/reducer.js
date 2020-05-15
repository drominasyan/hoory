import actions from './actions';

const initState = {
  searchList: [],
  searchValue : '',
};

export default function listReducer(state = initState, action) {
  switch (action.type) {
    case actions.SEARCH_LIST_REFRASH: {
      return {
          ...state,
          searchList : action.data,
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
