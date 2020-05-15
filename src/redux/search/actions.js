const actions = {
    SEARCH_LIST_REFRASH : 'SEARCH_LIST_REFRASH',
	SEARCH_VALUE_REFRASH : 'SEARCH_VALUE_REFRASH',

	searchListRefresh: data => ({
		type: actions.SEARCH_LIST_REFRASH,
		data,
	}),

	searchValueRefrash: data => ({
		type: actions.SEARCH_VALUE_REFRASH,
		data,
	}),
};

export default actions;
