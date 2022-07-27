import {actions} from './constant';

const initState = {
  trip: {},
  layout: {},
  view: 'ground',
  chosen: {
    total: 0,
    seats: new Set()
  },
  popup: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.init:
      return action.payload;
    case actions.picking:
      const seatId = action.payload;
      const chosen = state.chosen;
      // allow maximum 3 seat chosen
      if (!chosen.seats.has(seatId) && chosen.seats.size === 3) return {...state, popup: true};

      // update seat status
      if (chosen.seats.has(seatId)) {
        chosen.seats.delete(seatId);
      } else {
        chosen.seats.add(seatId);
      }

      // re-calc total
      chosen.total = chosen.seats.size * state.trip.price;
      return {...state, chosen};
    case actions.changeTab:
      const tabName = action.payload;
      return {...state, view: tabName};
    case actions.closePopup:
      return {...state, popup: false};
    default:
      throw Error(`action ${action} is not valid`);
  }
};

export default reducer;
export {initState};
