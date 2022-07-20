import moment from 'moment';
const pipe = {};

pipe.time = value => {
  return moment(value, 'hh:mm:ss').format('hh:mm');
};

pipe.distance = value => {
  let unit = 'm';
  let result = value;
  if (value >= 1000) {
    unit = 'km';
    result = value / 100;
  }
  return {formated: result.toFixed(), unit};
};

pipe.duration = value => {
  let unit = 'min';
  let result = value;
  if (value > 60) {
    unit = 'hour';
    result = value / 60;
  }

  if (value > 60 * 24) {
    unit = 'day';
    result = value / (60 * 24);
  }

  return {formated: result.toFixed(), unit};
};

pipe.currency = value => {
  return {formated: Intl.NumberFormat('en-US').format(value), unit: 'đ'};
};
export default pipe;
