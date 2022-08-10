import classNames from 'classnames/bind';
import {forwardRef, memo, useEffect, useImperativeHandle, useReducer} from 'react';
import style from './toast.module.scss';

const cx = classNames.bind(style);

const info = 'info';
const error = 'error';

const actions = {
  close: 'close',
  show: 'show'
};

const initState = {
  msg: '',
  type: info,
  status: false
};

const reducer = (state, action) => {
  const payload = action.payload;
  switch (action.type) {
    case actions.close:
      return {...state, status: false};
    case actions.show:
      return {
        ...state,
        type: payload.type,
        msg: payload.msg,
        status: true
      };
    default:
      throw new Error(`action ${action} is invalid`);
  }
};

const close = _ => ({type: actions.close});

const show = payload => ({type: actions.show, payload});

const Toast = forwardRef((_, ref) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const {type, msg, status} = state;
  useImperativeHandle(ref, () => ({
    hide: () => dispatch(close()),
    info: msg => dispatch(show({type: info, msg})),
    error: msg => dispatch(show({type: error, msg}))
  }));

  return (
    status && (
      <div className={cx('backdrop')}>
        <div className={cx('toast')}>
          <div className={cx('toast-header')}>
            {
              {
                info: 'Notification',
                error: 'Error'
              }[type]
            }
          </div>
          <div className={cx('toast-body')}>{msg}</div>
          <div className={cx('toast-action')}>
            <button onClick={() => dispatch(close())}>Close</button>
          </div>
        </div>
      </div>
    )
  );
});

export default memo(Toast);