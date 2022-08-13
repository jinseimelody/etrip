import moment from 'moment';

const storage = {};

const isPrimitive = value => {
  if (value === null) return true;
  if (typeof value === 'object') return false;
  return true;
};

const isObject = value => {
  return typeof value === 'object' && value.length === undefined;
};

const isArray = value => {
  return typeof value === 'object' && value.length !== undefined;
};

const pipe = value => {
  if (isPrimitive(value)) {
    if (RegExp('\\d{4}-\\d{2}-\\d{2}').test(value)) return moment(value);
    return value;
  }

  if (isObject(value)) {
    const result = {};
    const keys = Object.keys(value);
    for (let key of keys) {
      result[key] = pipe(value[key]);
    }
    return result;
  }

  if (isArray(value)) {
    const result = [];
    for (let item of value) {
      result.push(pipe(item));
    }

    return result;
  }
};

storage.get = key => {
  const persist = localStorage.getItem(key);
  if (persist) {
    return pipe(JSON.parse(persist));
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
