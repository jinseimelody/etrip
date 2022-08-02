import moment from 'moment';
import React, {useCallback, useEffect, useReducer, useRef, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {IoIosArrowBack} from 'react-icons/io';
import classNames from 'classnames/bind';

import {Calendar, Modal, Toast} from '~/components';
import reducer, {initState} from './reducer';
import styles from './tripsearch.module.scss';
import images from '~/assets';
import {EnpointPopup} from '../shared';
import {setArrival, setDeparture, setDate} from './actions';

const cx = classNames.bind(styles);

const TripSearch = () => {
  const navigate = useNavigate();
  const toastRef = useRef();
  const calendarRef = useRef();
  const datePickerPopupRef = useRef();
  const depaturePopupRef = useRef();
  const arrivalPopupRef = useRef();

  const [state, dispatch] = useReducer(reducer, initState);
  const next = () => {
    if (state.date && state.departure && state.arrival) {
      const from = state.departure.id;
      const to = state.arrival.id;
      const date = state.date.format('YYYY-MM-DD');
      navigate(`/tripselection/${from}/${to}/${date}`);
    }
    toastRef.current.showError('Please fill in all the required fields');
  };

  return (
    <div className={cx('wrapper')}>
      <Toast ref={toastRef} />
      <div className={cx('header')}>
        <div className={cx(['action', 'action--left'])}>
          <Link to="/dashboard">
            <IoIosArrowBack />
          </Link>
        </div>
        <div className={cx('title')}>Trip search</div>
      </div>
      <div className={cx('content')}>
        <div className="horizontal horizontal--space-between my-5" style={{alignItems: 'start'}}>
          <div style={{flexGrow: 1, fontWeight: 700, fontSize: '3rem'}}>
            Where do you want to go ?
          </div>
          <div
            style={{
              minWidth: '48px',
              height: '48px',
              marginLeft: '3rem',
              marginTop: '1.5rem',
              borderRadius: '1.5rem',
              background: 'wheat'
            }}></div>
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
          <div className="horizontal">
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
          <button onClick={next} className={cx('btn-search')}>
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
        <Calendar ref={calendarRef} initValue={state.date} options={{preview: true}} />
      </Modal>

      <EnpointPopup
        ref={depaturePopupRef}
        modal={{cancel: 'Cancel', title: 'Depature'}}
        onSelect={val => dispatch(setDeparture(val))}
      />

      <EnpointPopup
        ref={arrivalPopupRef}
        modal={{cancel: 'Cancel', title: 'Arrival'}}
        onSelect={val => dispatch(setArrival(val))}
      />
    </div>
  );
};

export default TripSearch;
