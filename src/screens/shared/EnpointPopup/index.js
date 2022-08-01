import React, {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useReducer,
  useRef,
  useState
} from 'react';
import classNames from 'classnames/bind';

import images from '~/assets';
import style from './endpoint.popup.module.scss';
import {endpointApi} from '~/api';
import {Modal} from '~/components';

const cx = classNames.bind(style);
const initState = {
  search: '',
  value: null,
  endpoints: []
};

const CLEAR = 'clear';
const SET_SEARCH = 'setsearch';
const SET_VALUE = 'setvalue';
const SET_ENDPOINTS = 'setendpoint';

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

const EnpointPopup = forwardRef((props, ref) => {
  const {onSelect, endpoint} = props;
  const modalRef = useRef();
  const typingTimerRef = useRef();

  const [state, dispatch] = useReducer(reducer, initState, () => ({
    ...initState,
    search: (endpoint && endpoint.name) || '',
    value: endpoint
  }));

  // monitor search text then call api
  useEffect(() => {
    typingTimerRef && clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(async () => {
      const endpoints = await endpointApi.search({q: state.search});
      dispatch(setEndpoints(endpoints));
    }, 500);
  }, [state.search]);

  useEffect(() => {
    onSelect && onSelect(state.value);
  }, [state.value]);

  useImperativeHandle(ref, () => ({
    show: () => {
      modalRef.current.show();
    },
    hide: () => {
      modalRef.current.hide();
    }
  }));

  return (
    <Modal ref={modalRef} cancel="Hủy" title="Ngày khởi hành">
      <div className={cx('endpoint-search-box')}>
        <input
          type="text"
          placeholder="Origin location"
          value={state.search}
          onChange={e => dispatch(setSearch(e.target.value))}
        />
        {state.search.length > 0 && (
          <span onClick={() => dispatch(clear())} className={cx('btn-cancel')}></span>
        )}
      </div>

      {state.endpoints && state.endpoints.length > 0 && (
        <div className={cx('endpoint-result')}>
          <div className={cx('group-name')}>Địa điểm phổ biến</div>
          {state.endpoints.map((ep, i) => (
            <div key={i} onClick={() => dispatch(setValue(ep))} className={cx('group-item')}>
              <div className={cx('decorator')}>
                <img src={images.marker} alt="" />
              </div>
              <div className={cx('content')}>{ep.name}</div>
              {state.value && state.value.id === ep.id && (
                <div className={cx(['decorator', 'decorator--checked'])}></div>
              )}
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
});

export default memo(EnpointPopup);
