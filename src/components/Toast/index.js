import ReactDOM from 'react-dom';
import React, {useRef} from 'react';
import {useContext} from 'react';
import {useState} from 'react';
import classNames from 'classnames/bind';

import style from './style.module.scss';
import {useEffect} from 'react';

const cx = classNames.bind(style);
const ToastContext = React.createContext(undefined);
export const useToast = () => useContext(ToastContext);
export const TYPE = {
  CONFIRM: 'confirm',
  ERROR: 'error',
  DEFAULT: 'default'
};

const Toast = props => {
  const {title, msg, isConfirm, onClose, onConfirm} = props;

  const element = (
    <div className={cx('backdrop')}>
      <div className={cx('toast')}>
        <div className={cx('toast-header')}>{title}</div>
        <div className={cx('toast-body')}>{msg}</div>
        <div className={cx('toast-footer')}>
          {isConfirm && (
            <button className={cx('btn-confirm')} onClick={onConfirm}>
              Confirm
            </button>
          )}
          <button className={cx('btn-close')} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(element, document.querySelector('#root'));
};

export const ToastProvider = ({children}) => {
  const [toast, setToast] = useState();
  const actionRef = useRef();
  const memoRef = useRef();

  useEffect(() => {
    if (toast !== null || !memoRef.current) return;
    if (!['close', 'confirm'].find(v => v === actionRef.current)) return;

    const {onClose, onConfirm} = memoRef.current;
    const action = {
      close: () => {
        onClose && onClose();
        cleanupRef();
      },
      confirm: () => {
        onConfirm && onConfirm();
        cleanupRef();
      }
    }[actionRef.current];

    typeof action === 'function' && action();
  }, [toast]);

  const cleanupRef = () => {
    actionRef.current = undefined;
    memoRef.current = undefined;
  };

  const show = (msg, option) => {
    setToast({
      msg: msg,
      type: TYPE.DEFAULT,
      ...option
    });
  };

  const dispatch = action => {
    const {type} = action;
    switch (type) {
      case 'close':
      case 'confirm':
        actionRef.current = type;
        memoRef.current = toast;
        setToast(null);
        break;
      default:
        return;
    }
  };

  return (
    <ToastContext.Provider value={{show}}>
      {children}
      {toast && (
        <Toast
          title={
            {
              confirm: 'Confirmation',
              error: 'Error',
              default: 'Notification'
            }[toast.type]
          }
          msg={toast.msg}
          isConfirm={toast.type === TYPE.CONFIRM}
          onClose={() => dispatch({type: 'close'})}
          onConfirm={() => dispatch({type: 'confirm'})}
        />
      )}
    </ToastContext.Provider>
  );
};
