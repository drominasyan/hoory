import { toInteger, keys, cloneDeep, isArray, isEmpty, isPlainObject } from 'lodash';

// check if value is ID: integer number > 0
export function isID(value) {
  return Boolean(toInteger(value));
}

export function isEqualID(id01, id02) {
  return toInteger(id01) === toInteger(id02);
}

// filling object
export function fill(source, target, withCreatingKeys = false) {

  const sourceKeys = keys(source);
  const targetKeys = keys(target);
  const result = cloneDeep(target);
  sourceKeys.forEach(key => {
    if (!targetKeys.includes(key) && !withCreatingKeys) {
      return;
    }
    result[key] = source[key];
  });
  return result;
}

// map enup
export function mapEnum(enumList) {
  const result = {};
  enumList.forEach(item => {
    const key = item.id;
    result[key] = item.name;
  });

  return result;
}

//cut enum
export function cutEnum(enumList, IDs, field = 'id') {
  if (!isArray(enumList) || isEmpty(enumList)) {
    return [];
  }
  if (!isArray(IDs) || isEmpty(IDs)) {
    return enumList;
  }

  return enumList.filter(item => !IDs.includes(item[field]));
}

// entities map to list
export function entitiesToEnumList(entities = {}, nameField = null) {

  const IDs = Object.keys(entities);
  if (IDs.length === 0) {
    return [];
  }

  const enumList = IDs.map(ID => {
    const entity = cloneDeep(entities[ID]);
    const entityName = entity.name;

    entity.id = toInteger(ID);
    if (!entityName && nameField) {
      entity.name = entity[nameField];
    }

    return entity;
  });

  return enumList;
}

// list convert to entities
export function listToEntities(list = [], nameKey = 'id') {
  if (!isArray(list) || isEmpty(list)) {
    return {};
  }

  const result = {};

  list.forEach(item => {
    const keyValue = item[nameKey];
    if (!keyValue) {
      return;
    }

    result[keyValue] = cloneDeep(item);
  });

  return result;
}

// create columns for Tables
export function createColumn(dataKey, title, render = null, sorter = null, width = null, className = null, key = null) {

  const column = {
    title,
    dataIndex : dataKey,
    key       : key || dataKey,
  };
  if (render) {
    column.render = (text, record) => render(record, dataKey);
  }
  if (sorter) {
    column.sorter = (a, b) => sorter(a, b);
  }
  if (width) {
    column.width = width;
  }
  if (className) {
    column.className = className;
  }

  return column;
}

export function isEmptyObject(obj = null) {
  if (!obj) {
    return true;
  }

  try {
    return (keys(obj) > 0);

  } catch (error) {
    return true;
  }
}

// For table pagination
export function getHeadersTotalCount(headers = {}) {

  const targetName = 'x-total-count';
  const headerKeys = keys(headers);
  for (let i = 0; i < headerKeys.length; i++) {
    const key = headerKeys[i];
    if (String(key).toLowerCase() === targetName) {
      return toInteger(headers[key]);
    }
  }

  return 0;
}

// detect is JSON
export function isJSON(rawData) {
	try {
		const parsed = JSON.parse(rawData);
		return isPlainObject(parsed);
	} catch (err) {
		return false;
	}
}

//allows only numbers
export function allowNumber(value) {
  return value.replace(/-[^0-9]/g, '');
}

//validEmail
export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
