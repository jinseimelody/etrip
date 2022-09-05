import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import classNames from 'classnames/bind';
import style from './toast.module.scss';

const cx = classNames.bind(style);

const ToastContext = React.createContext();
const useToast = () => useContext(ToastContext);

const ToastProvider = props => {
  const {children} = props;
  const [hook, setHook] = useState({
    onClose: undefined
  });

  const [state, setState] = useState({
    status: 'hide'
  });

  const show = (msg, closeCallback) => {
    setHook({
      onClose: closeCallback
    });
    setState({status: 'show', msg: msg});
  };

  const error = msg => setState({status: 'show', type: 'error', msg: msg});

  const hide = _ => setState({status: 'hide'});

  useEffect(() => {
    if (hook.onClose && state.status === 'hide') hook.onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <ToastContext.Provider value={{show, hide, error}}>
      {children}
      {state.status === 'show' && (
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
