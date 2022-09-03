import {forwardRef, memo, useImperativeHandle, useReducer, useRef} from 'react';
import classNames from 'classnames/bind';

import style from './trip.search.box.module.scss';
import image from '~/assets';
import {Calendar, Modal} from '~/components';
import moment from 'moment';
import EndPointPopup from './EndPointPopup';
const cx = classNames.bind(style);

const set_arrival = 'set_arrival';
const set_departure = 'set_departure';
const set_date = 'set_date';

const setArrival = arrival => ({type: set_arrival, payload: arrival});
const setDeparture = departure => ({type: set_departure, payload: departure});
const setDate = date => ({type: set_date, payload: date});

const reducer = (state, action) => {
  const {type, payload} = action;
  switch (type) {
    case set_departure:
      return {...state, departure: payload};
    case set_arrival:
      return {...state, arrival: payload};
    case set_date:
      return {...state, date: payload};
    default:
      return state;
  }
};

const TripSearchWidget = forwardRef(({onChange, data}, ref) => {
  const [state, dispatch] = useReducer(
    reducer,
    {departure: undefined, arrival: undefined, date: undefined},
    preState => {
      if (data)
        return {
          ...data,
          date: typeof data.date === 'string' ? moment(data.date) : data.date
        };
      return preState;
    }
  );

  const {departure, arrival, date} = state;

  const arrivalPopupRef = useRef();
  const departurePopupRef = useRef();
  const datePopupRef = useRef();

  useImperativeHandle(ref, () => ({
    openPopup: popupName => {
      const action = {
        departure: () =>
          departurePopupRef.current.show(departure && departure.name),
        arrival: () => arrivalPopupRef.current.show(arrival && arrival.name),
        date: () => datePopupRef.current.show()
      }[popupName];

      action();
    },
    getState: () => state
  }));

  return (
    <>
      <EndPointPopup
        ref={departurePopupRef}
        modal={{cancel: 'Cancel', title: 'Departure'}}
        onSelect={value => dispatch(setDeparture(value))}
      />
      <EndPointPopup
        ref={arrivalPopupRef}
        modal={{cancel: 'Cancel', title: 'Arrival'}}
        onSelect={value => dispatch(setArrival(value))}
      />
      <Modal ref={datePopupRef} cancel="Cancel" title="Departure Date">
        <Calendar
          value={state.date}
          type="month"
          onSelect={m => {
            datePopupRef.current.hide();
            dispatch(setDate(m));
          }}
        />
      </Modal>
      <div className={cx('search-widget')}>
        <div className={cx('route-section')}>
          <div className={cx('icon-container')}>
            <div className="icon">
              <img src={image.circleMarker} alt="" />
            </div>
            <div className={cx('line')}></div>
            <div className="icon">
              <img src={image.circleMarkerEnd} alt="" />
            </div>
          </div>
          <div className={cx('route-selection-container')}>
            <div
              className={cx('from-select')}
              onClick={() =>
                departurePopupRef.current.show(departure && departure.name)
              }>
              <span className="text-muted mb-1">Choose staring point</span>
              <input
                type="text"
                placeholder="Hà Nội"
                readOnly
                value={departure ? departure.name : ''}
              />
            </div>
            <div className={cx('rip')}></div>
            <div
              className={cx('to-select')}
              onClick={() =>
                arrivalPopupRef.current.show(arrival && arrival.name)
              }>
              <span className="text-muted mb-1">Choose destination</span>
              <input
                type="text"
                placeholder="Cao Bằng"
                readOnly
                value={arrival ? arrival.name : ''}></input>
            </div>
          </div>
          <button
            className={cx('btn-exchange')}
            onClick={() => {
              dispatch(setArrival(departure));
              dispatch(setDeparture(arrival));
            }}>
            <img src={image.vExchange} alt="" />
          </button>
        </div>
        <div className={cx('rip')} style={{marginLeft: '1.75rem'}}></div>
        <div className={cx('date-section')}>
          <div className={cx('icon-container')}>
            <div className="icon">
              <img src={image.calendar} alt=""></img>
            </div>
          </div>
          <div className={cx('route-selection-container')}>
            <div
              className={cx('date-select')}
              onClick={() => datePopupRef.current.show()}>
              <label className="text-muted mb-1">Departure Date</label>
              <input
                readOnly
                type="text"
                placeholder="Sat, 23/07, 22"
                value={date ? date.format('ddd, DD/MM, yyyy') : ''}></input>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default memo(TripSearchWidget);
