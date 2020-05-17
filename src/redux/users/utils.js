import cloneDeep from 'lodash';

export const removeUserFromList = (entities, userID) => {
    const clonedEntities = cloneDeep(entities);
    console.log(clonedEntities);
    return clonedEntities;

};
