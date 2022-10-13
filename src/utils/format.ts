import moment from 'moment';

export const format = {
  distance: (value: string | number | undefined) => {
    const num = Number(value);
    if (isNaN(num)) return null;

    // base on meter
    const unit = num < 1000 ? 'm' : 'km';

    const result = {
      m: num + ' ' + unit,
      km: Math.round((num / 1000) * 10) / 10 + ' ' + unit
    }[unit];

    return result;
  },

  duration: (value: string | number | undefined) => {
    // base on minutes
    const num = Number(value);
    if (isNaN(num)) return null;

    const milliseconds = num * 60 * 1000;
    const duration = moment.utc(milliseconds);
    return [
      { unit: 'h', value: duration.hours() },
      { unit: 'm', value: duration.minutes() }
    ].reduce((prev: any, current: any) => (current.value !== 0 ? prev + current.value + current.unit : prev), '');
  }
};
