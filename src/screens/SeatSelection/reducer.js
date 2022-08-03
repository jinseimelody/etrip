import {CHANGE_TAB, INIT, PICKING} from './constant';

const initState = {
  trip: {},
  layout: {},
  view: 'ground',
  chosen: {
    total: 0,
    seats: new Set()
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case INIT:
      return action.payload;
    case PICKING:
      const seatId = action.payload;
      const chosen = state.chosen;

      // update seat status
      if (chosen.seats.has(seatId)) {
        chosen.seats.delete(seatId);
      } else {
        chosen.seats.add(seatId);
      }

      // re-calc total
      chosen.total = chosen.seats.size * state.trip.price;
      return {...state, chosen};
    case CHANGE_TAB:
      const tabName = action.payload;
      return {...state, view: tabName};
    default:
      throw Error(`action ${action} is not valid`);
  }
};

export default reducer;
export {initState};
