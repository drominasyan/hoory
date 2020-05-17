const actions = {
    LIST_REFRASH : 'LIST_REFRASH',
	CURRENT_VALUE_REFRESH: 'CURRENT_VALUE_REFRESH',
	MODAL_VISIBLE : 'MODAL_VISIBLE',

	listRefresh: (key, list) => ({
		type: actions.LIST_REFRASH,
		data : {
			key,
			list,
		},
	}),

	currentDayRefraash: data => ({
		type: actions.CURRENT_VALUE_REFRESH,
		data,
	}),

	modalVisibleRefrash: data => ({
		type: actions.MODAL_VISIBLE,
		data,
	}),
};

export default actions;
