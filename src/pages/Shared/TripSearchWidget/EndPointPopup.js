import React, {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useReducer,
  useRef
} from 'react';
import {MdCancel} from 'react-icons/md';
import classNames from 'classnames/bind';

import image from '~/assets';
import style from './endpoint.popup.module.scss';
import {Modal} from '~/components';
import {endpointApi} from '~/apis';

const cx = classNames.bind(style);
const initState = {
  search: '',
  value: undefined,
  endpoints: []
};

const CLEAR = 'clear';
const SET_SEARCH = 'set_search';
const SET_VALUE = 'set_value';
const SET_ENDPOINTS = 'set_endpoint';

const clear = _ => ({type: CLEAR});
const setSearch = payload => ({type: SET_SEARCH, payload});
const setValue = payload => ({type: SET_VALUE, payload});
const setEndpoints = payload => ({type: SET_ENDPOINTS, payload});

const reducer = (state, action) => {
  switch (action.type) {
    case CLEAR:
      return {search: '', value: null, endpoints: []};
    case SET_SEARCH:
      return {...state, search: action.payload};
    case SET_VALUE:
      return {...state, value: action.payload};
    case SET_ENDPOINTS:
      return {...state, endpoints: action.payload};
    default:
      throw new Error(`action ${action} is invalid`);
  }
};

const Endpoint = forwardRef(({modal, onSelect}, ref) => {
  const modalRef = useRef();
  const typingTimerRef = useRef();

  const [state, dispatch] = useReducer(reducer, initState);
  // eslint-disable-next-line no-unused-vars
  const {search, value, endpoints} = state;

  // monitor search text then call api
  useEffect(() => {
    typingTimerRef && clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(async () => {
      const endpoints = await endpointApi.search({q: search});
      dispatch(setEndpoints(endpoints));
    }, 500);
  }, [search]);

  useImperativeHandle(ref, () => ({
    show: pattern => {
      if (pattern) dispatch(setSearch(pattern));
      modalRef.current.show();
    },
    hide: () => modalRef.current.hide()
  }));

  const handleSelect = ep => {
    modalRef.current.hide();
    dispatch(setValue(ep));
    onSelect && onSelect(ep);
  };

  return (
    <Modal ref={modalRef} {...modal}>
      <div className={cx('endpoint-search-box')}>
        <input
          type="text"
          placeholder="Origin location"
          value={search}
          onChange={e => dispatch(setSearch(e.target.value))}
        />
        {search && search.length > 0 && (
          <span onClick={() => dispatch(clear())} className={cx('btn-cancel')}>
            <MdCancel />
          </span>
        )}
      </div>

      {endpoints && endpoints.length > 0 && (
        <div className={cx('endpoint-result')}>
          <div className={cx('group-name')}>Popularize the location</div>
          {endpoints.map((ep, i) => (
            <div
              key={i}
              onClick={() => handleSelect(ep)}
              className={cx('group-item')}>
              <div className={cx('decorator')}>
                <img src={image.marker} alt="" />
              </div>
              <div className={cx('content')}>{ep.name}</div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
});

export default memo(Endpoint);
