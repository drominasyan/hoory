//Storing data locaStorage
export function storeInStorage(key, data) {
    return localStorage.setItem(key, JSON.stringify(data));
}

//Getting data from localStorage
export function getFromeLocalStorage(key) {
    const data = localStorage.getItem(key);
    return JSON.parse(data) || {};
}

export function clearToken() {
  localStorage.removeItem('id_token');
}

export function clearUser() {
  localStorage.removeItem('user');
}

export function getToken() {
  try {
    return localStorage.getItem('id_token');

  } catch (err) {
    clearToken();
    return null;
  }
}


export function getRawToken() {
  return localStorage.getItem('id_token');
}

export function getUser() {
  try {
    const rawUser = localStorage.getItem('user');
    return JSON.parse(rawUser);
  } catch (error) {
    clearUser();
    return null;
  }
}

const utils = {
  clearToken,
  getToken,
  getRawToken,
};


export default utils;
