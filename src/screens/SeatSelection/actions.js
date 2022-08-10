import {set_chosen, set_state, set_tab} from './constant';

export const setState = state => ({type: set_state, payload: state});

export const setChosen = chosen => ({type: set_chosen, payload: chosen});

export const setTab = tab => ({type: set_tab, payload: tab});
