import React, {useContext, useState} from 'react';
import classNames from 'classnames/bind';
import style from './toast.module.scss';

const cx = classNames.bind(style);

const ToastContext = React.createContext();
const useToast = () => useContext(ToastContext);

const ToastProvider = props => {
  const {children} = props;
  const [state, setState] = useState({});

  const show = msg => setState({msg: msg});

  const error = msg => setState({type: 'error', msg: msg});

  const hide = _ => setState({});

  return (
    <ToastContext.Provider value={{show, hide, error}}>
      {children}
      {state.msg && (
        <div className={cx('backdrop')}>
          <div className={cx('toast')}>
            <div className={cx('toast-header')}>
              {
                {
                  error: 'Error',
                  undefined: 'Notification'
                }[state.type]
              }
            </div>
            <div className={cx('toast-body')}>{state.msg}</div>
            <div className={cx('toast-action')}>
              <button onClick={() => hide()}>Close</button>
            </div>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export {ToastProvider, useToast};
