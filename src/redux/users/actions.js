const actions = {

	USERS_LIST_RELOAD             : 'USERS_LIST_RELOAD',
	USERS_LIST_REFRESH            : 'USERS_LIST_REFRESH',

	REMOVE_USER_FROM_LIST         : 'REMOVE_USER_FROM_LIST',
	EDIT_USER_FROM_LIST           : 'EDIT_USER_FROM_LIST',
	ADD_NEW_WORKSPACE             : 'ADD_NEW_WORKSPACE',

	USER_BASE_DATA_RELOAD         : 'USER_BASE_DATA_RELOAD',
	USER_BASE_DATA_REFRESH        : 'USER_BASE_DATA_REFRESH',

	UI_REFRESH      		  	  : 'UI_REFRESH',


	listReload: () => ({
		type: actions.USERS_LIST_RELOAD,
	}),
	addNewWorkSpace: () => ({
		type: actions.ADD_NEW_WORKSPACE,
	}),
	editUser: () => ({
		type: actions.EDIT_USER_FROM_LIST,
	}),
	listRefresh: list => ({
		type: actions.USERS_LIST_REFRESH,
		data: list,
	}),
	baseDataReload: userID => ({
		type: actions.USER_BASE_DATA_RELOAD,
		data: {
			userID,
		},
	}),
	baseDataRefresh: baseData => ({
		type: actions.USER_BASE_DATA_REFRESH,
		baseData,
	}),
	reoveUserByID: userID => ({
		type: actions.REMOVE_USER_FROM_LIST,
		data: {
			userID,
		},
	}),
	uiRefresh: UI => ({
		type: actions.UI_REFRESH,
		UI,
	}),
};

export default actions;
