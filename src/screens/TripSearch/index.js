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

  // const findTrips = () => {
  //   if (state.arrival && state.departure && state.date) {
  //     navigate(
  //       `/tripselection/${state.departure.id}/${state.arrival.id}/${state.date.format(
  //         'yyyy-MM-DD'
  //       )}`
  //     );
  //   }
  //   toastRef.current.showError('Vui lòng nhập đầy đủ thông tin');
  // };

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
          <button
            style={{
              width: '100%',
              fontWeight: 700,
              padding: '2rem',
              borderRadius: '1.75rem',
              lineHeight: '1rem',
              color: 'black',
              background: '#f9cf23'
            }}>
            Continue
          </button>
        </div>
      </div>

      <Modal
        ref={datePickerPopupRef}
        onConfirm={() => dispatch(setDate(calendarRef.current.getValue()))}
        cancel="Hủy"
        confirm="Chọn"
        title="Ngày khởi hành">
        <Calendar ref={calendarRef} options={{preview: true}} initValue={state.date} />
      </Modal>

      <EnpointPopup
        ref={depaturePopupRef}
        endpoint={state.departure}
        onSelect={val => {
          depaturePopupRef.current.hide();
          dispatch(setDeparture(val));
        }}
      />

      <EnpointPopup
        ref={arrivalPopupRef}
        endpoint={state.arrival}
        onSelect={val => {
          arrivalPopupRef.current.hide();
          dispatch(setArrival(val));
        }}
      />
    </div>
  );
};

export default TripSearch;
