import {actions} from './constant';

export const openPopup = payload => {
  return {type: actions.openPopup, payload};
};

export const closePopup = _ => {
  return {type: actions.closePopup};
};

export const fetchDepartures = payload => {
  return {type: actions.fetchDepartures, payload};
};

export const selectDeparture = payload => {
  return {type: actions.selectDeparture, payload};
};

export const clearDeparture = _ => {
  return {type: actions.clearDeparture};
};

export const fetchArrival = payload => {
  return {type: actions.fetchArrival, payload};
};

export const selectArrival = payload => {
  return {type: actions.selectArrival, payload};
};

export const clearArrival = _ => {
  return {type: actions.clearArrival};
};

export const selectDepartureDate = payload => {
  return {type: actions.selectDepartureDate, payload};
};
