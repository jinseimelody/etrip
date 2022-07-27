import {IoIosArrowBack} from 'react-icons/io';
import classNames from 'classnames/bind';
import {Link} from 'react-router-dom';

import styles from './tripsearch.module.scss';
import images from '~/assets';
import {useEffect, useReducer, useRef, useState} from 'react';
import {Modal} from '~/components';
import {endpointApi} from '~/api';
import {keyboard} from '~/helper';
import image from '~/assets';

const cx = classNames.bind(styles);

const DEPARTURE = 'departure';
const ARRIVAL = 'arrival';

const actions = {
  openPopup: 'openPopup',
  closePopup: 'closePopup',
  selectDeparture: 'selectDeparture',
  clearDeparture: 'clearDeparture',
  fetchDepartures: 'fetchDepartures',
  fetchArrival: 'fetchArrival',
  clearArrival: 'clearArrival'
};

const openPopup = payload => {
  return {type: actions.openPopup, payload};
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

const clearDeparture = _ => {
  return {type: actions.clearDeparture};
};

const fetchArrival = payload => {
  return {type: actions.fetchArrival, payload};
};

const selectArrival = payload => {
  return {type: actions.selectArrival, payload};
};

const clearArrival = _ => {
  return {type: actions.clearArrival};
};

const initState = {
  popup: null,
  depature: null,
  depatures: [],
  arrival: null,
  arrivals: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.openPopup:
      return {...state, popup: action.payload};
    case actions.closePopup:
      return {...state, popup: null};
    case actions.fetchDepartures:
      return {...state, depatures: action.payload};
    case actions.selectDeparture:
      return {...state, depature: action.payload, popup: false};
    case actions.clearDeparture:
      return {...state, depatures: [], depature: null};
    case actions.fetchArrival:
      return {...state, arrivals: action.payload};
    case actions.selectArrival:
      return {...state, arrival: action.payload, popup: false};
    case actions.clearArrival:
      return {...state, arrivals: [], arrival: null};
    default:
      throw new Error(`action ${action} is invalid`);
  }
};

const EndpointSelect = props => {
  const {modal, onSearch, onClear, onSelect, selected, endpoints} = props;
  const [input, setInput] = useState(selected ? selected.name : '');
  const typingTimer = useRef();

  useEffect(() => {
    if (input.length === 0) {
      if (typingTimer.current) clearTimeout(typingTimer.current);
      onClear();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  const emitSearch = e => {
    setInput(e.target.value);
    if (typingTimer.current) clearTimeout(typingTimer.current);
    if (!keyboard.isNormalKeys(e)) return;

    typingTimer.current = setTimeout(async () => onSearch(input), 1000);
  };

  const emitClear = _ => {
    setInput('');
  };

  return (
    <Modal {...modal}>
      <div className={cx('endpoint-container')}>
        <div className={cx('endpoint-container__search')}>
          <input
            value={input}
            onChange={e => emitSearch(e)}
            type="text"
            placeholder="Origin location"
          />
          {input && input.length > 0 && (
            <span onClick={_ => emitClear()} className={cx('btn-cancel')}></span>
          )}
        </div>
        <div className={cx('endpoint-container__title')}>Địa điểm phổ biến</div>
        {endpoints &&
          endpoints.map((endpoint, i) => (
            <div key={i} onClick={() => onSelect(endpoint)} className={cx('endpoint')}>
              <div className={cx('endpoint__decorator')}>
                <img src={image.marker} alt="" />
              </div>
              <div className={cx('endpoint__content')}>{endpoint.name}</div>
              {selected && selected.id === endpoint.id && (
                <div className={cx(['endpoint__decorator', 'endpoint__decorator--checked'])}></div>
              )}
            </div>
          ))}
      </div>
    </Modal>
  );
};

const TripSearch = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  const handleSearch = async pattern => {
    console.log('api call');
    const endpoint = await endpointApi.search({q: pattern});
    switch (state.popup) {
      case DEPARTURE:
        return dispatch(fetchDepartures(endpoint));
      case ARRIVAL:
        return dispatch(fetchArrival(endpoint));
      default:
        throw new Error(`popup ${state.popup} is invalid`);
    }
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
            <div onClick={() => dispatch(openPopup(DEPARTURE))}>
              <span className="text-muted mb-1">From</span>
              <input
                onClick={e => e.target.blur()}
                defaultValue={state.depature ? state.depature.name : ''}
                type="text"
                placeholder="Hà Nội"
              />
            </div>
            <div className={cx('rip')}></div>
            <div onClick={() => dispatch(openPopup(ARRIVAL))}>
              <span className="text-muted mb-1">To</span>
              <input
                onClick={e => e.target.blur()}
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
        <EndpointSelect
          modal={{
            onClose: () => dispatch(closePopup()),
            cancel: 'Hủy',
            title: state.popup === DEPARTURE ? 'Chọn điểm đi' : 'Chọn điểm đến'
          }}
          selected={state.popup === DEPARTURE ? state.depature : state.arrival}
          endpoints={state.popup === DEPARTURE ? state.depatures : state.arrivals}
          onSearch={pattern => handleSearch(pattern)}
          onClear={_ => {
            switch (state.popup) {
              case DEPARTURE:
                return dispatch(clearDeparture());
              case ARRIVAL:
                return dispatch(clearArrival());
              default:
                throw new Error(`popup ${state.popup} is invalid`);
            }
          }}
          onSelect={enpoint => {
            switch (state.popup) {
              case DEPARTURE:
                return dispatch(selectDeparture(enpoint));
              case ARRIVAL:
                return dispatch(selectArrival(enpoint));
              default:
                throw new Error(`popup ${state.popup} is invalid`);
            }
          }}
        />
      )}
    </div>
  );
};
export default TripSearch;
