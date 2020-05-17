import { createSelector } from 'reselect';

const authData = (state) => state.Auth.get('baseData');
const authUI  = (state) => state.Auth.get('UI');


// Auth Entities ------------------------------------------------------------------------
export const deriveAuthData = createSelector(
  [authData],
  (entities) => entities,
);

export const deriveAuthUI = createSelector(
  [authUI],
  (UI) => UI,
);
