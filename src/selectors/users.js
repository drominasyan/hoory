import { createSelector } from 'reselect';
import values from 'lodash/values';

const usersEntities     = (state) => state.Users.get('entities');
const usersBaseData     = (state) => state.Users.get('baseData');
const usersUI           = (state) => state.Users.get('UI');


// Users Entities ------------------------------------------------------------------------
export const deriveUsersEntities = createSelector(
  [usersEntities],
  (entities) => entities,
);

// Users List ------------------------------------------------------------------------
export const deriveUsersList = createSelector(
  [deriveUsersEntities],
  (entities) => values(entities),
);

export const deriveUserBaseData = createSelector(
  [usersBaseData],
  (UI) => UI,
);

export const deriveUsersUI = createSelector(
  [usersUI],
  (UI) => UI,
);
