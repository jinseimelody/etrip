import {actions} from './constant';

export const init = payload => {
  return {type: actions.init, payload};
};

export const changeTab = payload => {
  return {type: actions.changeTab, payload};
};

export const picking = payload => {
  return {type: actions.picking, payload};
};

export const closePopup = _ => {
  return {type: actions.closePopup};
};
