import moment from 'moment';
import {isPrimitive, isObject, isArray} from '~/helpers';
const storage = {};

const mapping = value => {
  if (isPrimitive(value)) {
    if (RegExp('\\d{4}-\\d{2}-\\d{2}').test(value)) return moment(value);
    return value;
  }

  if (isObject(value)) {
    const result = {};
    const keys = Object.keys(value);
    for (let key of keys) {
      result[key] = mapping(value[key]);
    }
    return result;
  }

  if (isArray(value)) {
    const result = [];
    for (let item of value) {
      result.push(mapping(item));
    }

    return result;
  }
};

storage.get = key => {
  const persist = localStorage.getItem(key);
  if (persist) {
    return mapping(JSON.parse(persist));
  }
  return null;
};

storage.set = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

storage.remove = key => {
  localStorage.removeItem(key);
};

export default storage;
