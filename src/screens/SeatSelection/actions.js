import {CHANGE_TAB, INIT, PICKING} from './constant';

export const init = payload => {
  return {type: INIT, payload};
};

export const changeTab = payload => {
  return {type: CHANGE_TAB, payload};
};

export const picking = payload => {
  return {type: PICKING, payload};
};
