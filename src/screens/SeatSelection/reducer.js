import {set_chosen, set_state, set_tab} from './constant';

const iniState = {
  general: {},
  layout: {},
  view: 'ground',
  chosen: {
    total: 0,
    seats: new Set()
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case set_state:
      return action.payload;
    case set_tab:
      return {...state, view: action.payload};
    case set_chosen:
      return {...state, chosen: action.payload};
    default:
      throw Error(`action ${action} is not valid`);
  }
};

export default reducer;
export {iniState};
