const actions = {
    ENTITIES_REFRESH : 'ENTITIES_REFRESH',
	UI_REFRESH : 'UI_REFRESH',

	wizardRefrash: (data) => ({
		type: actions.ENTITIES_REFRESH,
		data,
	}),

	uiRefresh: UI => ({
		type: actions.UI_REFRESH,
		UI,
	}),
};

export default actions;
