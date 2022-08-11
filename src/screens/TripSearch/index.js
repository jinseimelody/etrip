import React, {useCallback, useReducer, useRef} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {IoIosArrowBack} from 'react-icons/io';
import classNames from 'classnames/bind';

import styles from './trip.search.module.scss';
import images from '~/assets';
import {Calendar, Modal} from '~/components';
import {setArrival, setDeparture, setDate} from './actions';
import reducer, {initState} from './reducer';
import EndpointPopup from '../shared/EndpointPopup';
import {storage} from '~/api';
import {useToast} from '~/components/Toast';

const cx = classNames.bind(styles);

const TripSearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const calendarRef = useRef();
  const datePickerPopupRef = useRef();
  const depaturePopupRef = useRef();
  const arrivalPopupRef = useRef();

  const [state, dispatch] = useReducer(reducer, initState, prev => {
    if (location.state && location.state.restore) {
      return storage.get('search');
    }

    storage.remove('search');
    return prev;
  });

  const next = () => {
    // redirect to search
    if (state.date && state.departure.id && state.arrival.id) {
      const from = state.departure.id;
      const to = state.arrival.id;
      const date = state.date.format('yyyy-MM-DD');
      storage.set('search', state);
      navigate(`/search/${from}/${to}/${date}`);
      return;
    }
    toast.error('Please fill in all the required fields');
  };

  const departureSelectHandler = useCallback(val => dispatch(setDeparture(val)), []);
  const arrivalSelectHandler = useCallback(val => dispatch(setArrival(val)), []);

  return (
    <>
      <div className="header">
        <div className="action action-left">
          <Link to="/dashboard">
            <IoIosArrowBack />
          </Link>
        </div>
        <div className="text-title">Trip search</div>
      </div>
      <div className="container">
        <div className="flex flex-start flex-nowrap space-between my-4">
          <div className="text-hero">Where do you want to go ?</div>
          <div className="avatar"></div>
        </div>

        <div className={cx('search-box')}>
          <div className="flex-1" style={{marginRight: '1.75rem'}}>
            <div className="cursor-pointer">
              <span className="text-muted mb-1">From</span>
              <input
                readOnly
                onClick={_ => depaturePopupRef.current.show()}
                defaultValue={state.departure ? state.departure.name : ''}
                type="text"
                placeholder="Hà Nội"
              />
            </div>
            <div className={cx('rip')}></div>
            <div className="cursor-pointer">
              <span className="text-muted mb-1">To</span>
              <input
                readOnly
                onClick={_ => arrivalPopupRef.current.show()}
                defaultValue={state.arrival ? state.arrival.name : ''}
                type="text"
                placeholder="Cao Bằng"></input>
            </div>
          </div>
          <div className="flex">
            <button className={cx('btn-exchange')}>
              <img src={images.vExchange} alt="" />
            </button>
          </div>
        </div>

        <div className={cx('departure-box')}>
          <label className="text-muted mb-1">Departure Date</label>
          <div className={cx('input-container')}>
            <input
              readOnly
              onClick={_ => datePickerPopupRef.current.show()}
              type="text"
              defaultValue={state.date ? state.date.format('ddd, DD/MM, YY') : null}
              placeholder="Sat, 23/07, 22"></input>
            <div className={cx('input-icon')}>
              <img src={images.calendar} alt=""></img>
            </div>
          </div>
        </div>

        <div>
          <button onClick={next} className="btn-submit">
            Continue
          </button>
        </div>
      </div>

      <Modal
        ref={datePickerPopupRef}
        onConfirm={() => dispatch(setDate(calendarRef.current.getValue()))}
        cancel="Cancel"
        confirm="Select"
        title="Depature Date">
        <Calendar
          ref={calendarRef}
          initValue={state.date}
          options={{mode: 'month', preview: true}}
        />
      </Modal>

      <EndpointPopup
        ref={depaturePopupRef}
        modal={{cancel: 'Cancel', title: 'Depature'}}
        onSelect={departureSelectHandler}
      />

      <EndpointPopup
        ref={arrivalPopupRef}
        modal={{cancel: 'Cancel', title: 'Arrival'}}
        onSelect={arrivalSelectHandler}
      />
    </>
  );
};

export default TripSearch;
