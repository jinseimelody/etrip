import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';

import style from './style.module.scss';
const cx = classNames.bind(style);

export type TypeOptions = 'confirm' | 'error' | 'default';

export interface ToastOption {
  type: TypeOptions;
  onClose?: () => any;
  onConfirm?: () => any;
}

export interface ToastProps extends ToastOption {
  msg: string;
}

const Toast: React.FC<ToastProps> = ({msg, type, onClose, onConfirm}) => {
  const title = {
    confirm: 'Confirmation',
    error: 'Error',
    default: 'Notification'
  }[type];

  const element = (
    <div className={cx('backdrop')}>
      <div className={cx('toast')}>
        <div className={cx('toast-header')}>{title}</div>
        <div className={cx('toast-body')}>{msg}</div>
        <div className={cx('toast-footer')}>
          {type === 'confirm' && (
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

  return ReactDOM.createPortal(element, document.getElementById('root') as HTMLElement);
};

export default Toast;
