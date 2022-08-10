import moment from 'moment';
import buslayout from './bus.layout';
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

export const keyboard = {
  isNormalKeys: e => {
    const exceptKeys = new Set([
      'Control',
      'Alt',
      'Tab',
      'CapsLock',
      'Meta',
      'ContextMenu',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
      'NumLock',
      'Insert',
      'Delete',
      'End',
      'Home',
      'PageUp',
      'PageDown',
      'PrintScreen',
      'ScrollLock',
      'Pause'
    ]);
    return !exceptKeys.has(e.key);
  }
};

export {pipe};
export {default as buslayout} from './bus.layout';
