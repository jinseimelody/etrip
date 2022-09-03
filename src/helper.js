import moment from 'moment';
const pipe = {};

pipe.time = (value, format = 'hh:mm A') => {
  if (moment.isMoment(value)) return value.format(format);

  return moment(value, 'hh:mm:ss').format(format);
};

pipe.distance = value => {
  let unit = 'm';
  let result = value;
  if (value >= 1000) {
    unit = 'km';
    result = value / 100;
  }
  return '' + result.toFixed() + unit;
};

pipe.duration = (value, format = 'hm') => {
  if (!['hm', 'ms'].includes(format)) return value;

  const [startUnit, endUnit] = format.split('');
  const start = Math.floor(value / 60);
  const end = value % 60;

  let result = start > 0 ? `${Math.floor(value / 60)}${startUnit}` : ' ';
  result += end > 0 ? `${value % 60}${endUnit}` : ' ';

  return result;
};

pipe.currency = (value, format = 'en-US') => {
  return Intl.NumberFormat(format).format(value);
};

export const isIterable = obj => {
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === 'function';
};

export default pipe;
