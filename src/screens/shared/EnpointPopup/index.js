import React, {forwardRef, memo, useEffect, useImperativeHandle, useReducer, useRef} from 'react';
import classNames from 'classnames/bind';

import images from '~/assets';
import style from './endpoint.popup.module.scss';
import {keyboard} from '~/helper';
import {endpointApi} from '~/api';
import {Modal} from '~/components';

const cx = classNames.bind(style);
const initState = {
  searchPattern: '',
  value: null,
  endpoints: []
};

const actions = {
  setEndpoints: 'setEndpoints',
  setSearchPattern: 'setSearchPattern',
  all: 'all'
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.setEndpoints:
      return {...state, endpoints: action.payload};
    case actions.setSearchPattern:
      return {...state, searchPattern: action.payload};
    case actions.all:
      return action.payload;
    default:
      throw new Error(`action ${action} is invalid`);
  }
};

const EnpointPopup = forwardRef((props, ref) => {
  const {endpoint} = props;
  const typingTimerRef = useRef();
  const modalRef = useRef();

  const [state, dispatch] = useReducer(reducer, initState, () => ({
    ...initState,
    searchPattern: endpoint && endpoint.name,
    value: endpoint
  }));

  useEffect(() => {
    if (!state.searchPattern) {
      endpointApi.search({q: ''}).then(endpoints => {
        dispatch({type: actions.setEndpoints, payload: endpoints});
      });
    }
  }, [state.searchPattern]);

  useImperativeHandle(ref, () => ({
    show: () => {
      modalRef.current.show();
    },
    hide: () => {
      modalRef.current.hide();
    }
  }));

  const handleTyping = e => {
    typingTimerRef && clearTimeout(typingTimerRef.current);
    if (!keyboard.isNormalKeys(e)) {
      dispatch({type: actions.setSearchPattern, payload: e.target.value});
      return;
    }

    typingTimerRef.current = setTimeout(async () => {
      const endpoints = await endpointApi.search({q: e.target.value});
      dispatch({type: actions.setEndpoints, payload: endpoints});
    }, 500);
  };

  const handleClear = () => {
    dispatch({
      type: actions.all,
      payload: {
        searchPattern: null,
        value: null,
        endpoints: []
      }
    });
  };

  const handleSelect = ep => {
    // setValue(ep);
  };

  return (
    <Modal ref={modalRef} cancel="Hủy" title="Ngày khởi hành">
      <div className={cx('endpoint-search-box')}>
        <input
          type="text"
          placeholder="Origin location"
          value={state.searchPattern}
          onChange={handleTyping}
        />
        {state.searchPattern && state.searchPattern.length > 0 && (
          <span onClick={handleClear} className={cx('btn-cancel')}></span>
        )}
      </div>

      {state.endpoints && state.endpoints.length > 0 && (
        <div className={cx('endpoint-resuls')}>
          <div className={cx('group-name')}>Địa điểm phổ biến</div>
          {state.endpoints.map((ep, i) => (
            <div
              key={i}
              onClick={() => {
                handleSelect(ep);
              }}
              className={cx('group-item')}>
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
