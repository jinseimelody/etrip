const {actions} = require('./constant');

const initState = {
  popup: null,
  departures: [],
  arrivals: [],
  arrival: null,
  departure: null,
  departureDate: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.openPopup:
      return {...state, popup: action.payload};
    case actions.closePopup:
      return {...state, popup: null};
    case actions.fetchDepartures:
      return {...state, departures: action.payload};
    case actions.selectDeparture:
      return {...state, departure: action.payload, popup: false};
    case actions.clearDeparture:
      return {...state, departures: [], departure: null};
    case actions.fetchArrival:
      return {...state, arrivals: action.payload};
    case actions.selectArrival:
      return {...state, arrival: action.payload, popup: false};
    case actions.clearArrival:
      return {...state, arrivals: [], arrival: null};
    case actions.selectDepartureDate:
      return {...state, departureDate: action.payload, popup: null};
    default:
      throw new Error(`action ${action} is invalid`);
  }
};

export default reducer;
export {initState};
