import axios from 'axios';
import { getRawToken } from '../utility';

//We dont have any API
const API_URL = '';
export function apiRequest(req) {
  const url       = API_URL + req.url;
  const token     = getRawToken();

  if (!req.headers) {
    req.headers = {};
  }
  if (token) {
    req.headers.Authorization = token;
  }
  req.headers['X-Requested-With'] = 'XMLHttpRequest';

  if (!req.params) {
    req.params = {};
  }
  if (!req.data) {
    req.data = {};
  }

  const axiosData = {
    method: req.method,
    url,
    headers: req.headers,
    params: req.params,
    data: req.data,
    onUploadProgress: req.onUploadProgress,
  };

  const axiosRequest = axios(axiosData);
  axiosRequest.catch((error) => {
    if (error.response && error.response.status) {
    //   switch (error.response.status) {
    //     case (window.location.href !== '/signin'): {
    //       window.location.href = '/signin';
        //   return localStorage.clear();
    //     }
    //     default: return axiosRequest;
    //   }
        return axiosRequest;
    }
  });
  return axiosRequest;
}
