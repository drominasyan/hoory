import { apiRequest } from './index';

// get list of users without restrictions
export function usersList(params = {}) {
	const req = {
		method: 'GET',
		url: '/users',
		params,
	};

	return apiRequest(req);
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
