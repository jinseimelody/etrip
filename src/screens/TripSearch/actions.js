import {SET_ARRIVAL, SET_DEPARTURE, SET_DATE} from './constant';

export const setDeparture = payload => {
  return {type: SET_DEPARTURE, payload};
};

export const setArrival = payload => {
  return {type: SET_ARRIVAL, payload};
};

export const setDate = payload => {
  return {type: SET_DATE, payload};
};
