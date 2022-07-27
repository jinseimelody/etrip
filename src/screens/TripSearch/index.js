import Tippy from '@tippyjs/react/headless';
import {IoIosArrowBack} from 'react-icons/io';
import classNames from 'classnames/bind';
import {Link} from 'react-router-dom';

import styles from './tripsearch.module.scss';
import images from '~/assets';
import {useReducer, useRef} from 'react';
import {Card, Modal} from '~/components';
import {endpointApi} from '~/api';
import {keyboard} from '~/helper';

const cx = classNames.bind(styles);

const actions = {
  openPopup: 'openPopup',
  closePopup: 'closePopup',
  selectDeparture: 'selectDeparture',
  fetchDepartures: 'fetchDepartures',
  fetchArrival: 'fetchArrival'
};

const openPopup = _ => {
  return {type: actions.openPopup};
};

const closePopup = _ => {
  return {type: actions.closePopup};
};

const fetchDepartures = payload => {
  return {type: actions.fetchDepartures, payload};
};

const selectDeparture = payload => {
  return {type: actions.selectDeparture, payload};
};

const initState = {
  popup: false,
  depature: null,
  depatures: [],
  arrival: null,
  arrivals: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.openPopup:
      return {...state, popup: true};
    case actions.closePopup:
      return {...state, popup: false};
    case actions.fetchDepartures:
      return {...state, depatures: action.payload};
    case actions.selectDeparture:
      return {...state, depature: action.payload, popup: false};
    case actions.fetchArrival:
      return {...state, arrival: action.payload};
    default:
      throw new Error(`action ${action} is invalid`);
  }
};

const TripSearch = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  const typingTimer = useRef();

  const handleSearch = e => {
    if (typingTimer.current) clearTimeout(typingTimer.current);
    if (!keyboard.isNormalKeys(e)) return;

    typingTimer.current = setTimeout(async () => {
      const enpoints = await endpointApi.search({q: e.target.value});
      console.log(enpoints);
      dispatch(fetchDepartures(enpoints));
    }, 1000);
  };

  return (
    <div className={cx('wrapper')}>
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
            <div onClick={() => dispatch(openPopup())}>
              <span className="text-muted mb-1">From</span>
              <input onClick={e => e.target.blur()} type="text" placeholder="Hà Nội" />
            </div>
            <div className={cx('rip')}></div>
            <label className="vertical" htmlFor="to">
              <span className="text-muted mb-1">To</span>
              <input id="to" type="text" placeholder="Cao Bằng"></input>
            </label>
          </div>
          <div className="horizontal">
            <button className={cx('btn-exchange')}>
              <img src={images.vExchange} alt="" />
            </button>
          </div>
        </div>

        <div className={cx('depature-box')}>
          <label className="text-muted mb-1">Departure Date</label>
          <div className={cx('input-container')}>
            <input type="text" placeholder="Sat, 23/07, 22"></input>
            <div className={cx('input-icon')}>
              <img src={images.calendar} alt=""></img>
            </div>
          </div>
        </div>

        <div>
          <Link to="/tripselection">
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
          </Link>
        </div>
      </div>
      {state.popup && (
        <Modal onClose={() => dispatch(closePopup())} title="Chọn điểm đi" cancel="Hủy">
          <div>
            <input onKeyUp={e => handleSearch(e)} type="text" placeholder="Origin" />
          </div>

          <div className={cx('endpoint-container')}>
            <div className={cx('endpoint-container__title')}>Địa điểm phổ biến</div>
            {state.depatures &&
              state.depatures.map((endpoint, i) => (
                <div
                  key={i}
                  onClick={() => dispatch(selectDeparture(endpoint))}
                  className={cx('endpoint')}>
                  <div className={cx('endpoint__decorator')}></div>
                  <div className={cx('endpoint__content')}>{endpoint.name}</div>
                  {state.depature && state.depature.id === endpoint.id && (
                    <div className={cx('endpoint__decorator')}></div>
                  )}
                </div>
              ))}
          </div>
        </Modal>
      )}
    </div>
  );
};
export default TripSearch;
