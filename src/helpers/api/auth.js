import { apiRequest } from './index';

export function apiLogin(authData) {

  const req = {
    method: 'POST',
    url: '/admin/login',
    data: authData,
  };

  return apiRequest(req);
}
