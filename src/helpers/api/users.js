import { apiRequest } from './index';

// get list of users without restrictions
export function usersList(params = {}) {
	const req = {
		method: 'GET',
		url: '/users',
		params,
	};
	// returning true expecting the server response status is 200
	return true;

	// return apiRequest(req);
}

// get list of users without restrictions
export function removeUser(id, params = {}) {
	const req = {
		method: 'DELETE',
		url: `/users/${id}`,
		params,
	};

	return apiRequest(req);
}

export const usersAPI = {
	usersList,
	removeUser,
};
