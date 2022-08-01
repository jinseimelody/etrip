import {SET_ARRIVAL, SET_DEPARTURE, SET_DATE} from './constant';

const initState = {
  arrival: null,
  departure: null,
  date: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_DEPARTURE:
      return {...state, departure: action.payload};
    case SET_ARRIVAL:
      return {...state, arrival: action.payload};
    case SET_DATE:
      return {...state, date: action.payload};
    default:
      throw new Error(`action ${action} is invalid`);
  }
};

export default reducer;
export {initState};
