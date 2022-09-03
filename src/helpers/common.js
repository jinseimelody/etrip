export const isPrimitive = value => {
  if (value === null) return true;
  if (typeof value === 'object') return false;
  return true;
};

export const isObject = value => {
  return typeof value === 'object' && value.length === undefined;
};

export const isArray = value => {
  return typeof value === 'object' && value.length !== undefined;
};
