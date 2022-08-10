import React, {useContext, useReducer, useRef, useState} from 'react';
import {Link, Outlet} from 'react-router-dom';
import {Calendar} from '~/components';
import EndpointPopup from '../shared/EndpointPopup';

export const ScreenA = () => {
  const [state, dispath] = useContext(SearchContext);
  const depaturePopupRef = useRef();
  const arrivalPopupRef = useRef();
  const calendarRef = useRef();
  return (
    <>
      <EndpointPopup
        modal={{cancel: 'Hủy', title: 'Điểm đi'}}
        ref={depaturePopupRef}
        initValue={state.date}
        onSelect={val => dispath(setDeparture(val))}
      />
      <EndpointPopup
        modal={{cancel: 'Hủy', title: 'Điểm đến'}}
        ref={arrivalPopupRef}
        initValue={state.date}
        onSelect={val => dispath(setArrival(val))}
      />
      <div style={{padding: '2rem', position: 'relative'}}>
        <div
          className="mb-5"
          style={{border: '1px solid var(--grey)', padding: '1.5rem', borderRadius: '1.5rem'}}>
          <strong>state</strong>
          <div>{JSON.stringify(state)}</div>
        </div>

        <div className="mb-3">
          <strong>Nơi đi</strong>
          <div>
            <input
              readOnly
              defaultValue={state.depature && state.depature.name}
              onClick={() => depaturePopupRef.current.show()}
              placeholder="Nơi đi"></input>
          </div>
        </div>
        <div className="mb-3">
          <strong>Nơi đến</strong>
          <div>
            <input
              readOnly
              defaultValue={state.arrival && state.arrival.name}
              onClick={() => arrivalPopupRef.current.show()}
              placeholder="Nơi đến"></input>
          </div>
        </div>
        <div>
          <strong>Ngày đi</strong>
          <div>
            <Calendar
              ref={calendarRef}
              options={{mode: 'month'}}
              initValue={state.date}
              onSelect={val => dispath(setDate(val))}></Calendar>
          </div>
        </div>
        <div>
          <button className="btn-submit">Continue</button>
        </div>
      </div>
    </>
  );
};

export const ScreenB = () => {
  const [state, dispath] = useContext(SearchContext);

  return (
    <>
      <div style={{padding: '2rem', position: 'relative'}}>
        <div
          className="mb-5"
          style={{border: '1px solid var(--grey)', padding: '1.5rem', borderRadius: '1.5rem'}}>
          <strong>state</strong>
          <div>{JSON.stringify(state)}</div>
        </div>
      </div>
    </>
  );
};

export const ScreenC = () => {
  return <>tao la c</>;
};

/*-------------------*/
const SearchContext = React.createContext();

const init = {
  depature: null,
  arrival: null,
  date: null
};

const reducer = (state, action) => {
  let next = {};
  switch (action.type) {
    case SET_DEPARTURE:
      next = {...state, depature: action.payload};
      break;
    case SET_ARRIVAL:
      next = {...state, arrival: action.payload};
      break;
    case SET_DATE:
      next = {...state, date: action.payload};
      break;
    default:
      throw new Error(`action ${action} is invalid`);
  }
  localStorage.setItem('search', JSON.stringify(next));
  return next;
};

const SET_DEPARTURE = 'SET_DEPARTURE';
const SET_ARRIVAL = 'SET_ARRIVAL';
const SET_DATE = 'SET_DATE';

const setDeparture = payload => ({type: SET_DEPARTURE, payload});
const setArrival = payload => ({type: SET_ARRIVAL, payload});
const setDate = payload => ({type: SET_DATE, payload});

const RouterDom = () => {
  const [state, dispath] = useReducer(reducer, init, prev => {
    const persistData = localStorage.getItem('search');
    if (persistData) return JSON.parse(persistData);
    return prev;
  });

  return (
    <>
      <div style={{display: 'flex'}}>
        <Link to="a">Link to A</Link>
        <Link to="b">Link to B</Link>
        <Link to="c">Link to C</Link>
      </div>

      <SearchContext.Provider value={[state, dispath]}>
        <Outlet />
      </SearchContext.Provider>
    </>
  );
};

export default RouterDom;
