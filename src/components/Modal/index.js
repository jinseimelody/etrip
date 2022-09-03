import {useSelector} from 'react-redux';
import {forwardRef, memo, useImperativeHandle, useState} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';

import style from './modal.module.scss';
const cx = classNames.bind(style);

const Modal = forwardRef((props, ref) => {
  const device = useSelector(state => state.device);
  const {initStatus, onConfirm, onCancel, cancel, confirm, title, children} = props;
  const [state, setState] = useState({status: initStatus ?? false});
  const {status, animate} = state;

  const executeAnimate = animate => {
    setState({status: true, animate});
    if (animate === 'animate__slideOutDown') {
      setTimeout(() => {
        setState({status: false});
      }, 350);
    }
  };

  useImperativeHandle(ref, () => ({
    show: () => executeAnimate('animate__slideInUp'),
    hide: async () => executeAnimate('animate__slideOutDown')
  }));

  const handleCancel = async () => {
    await executeAnimate('animate__slideOutDown');
    onCancel && onCancel();
  };

  const handleConfirm = async () => {
    await executeAnimate('animate__slideOutDown');
    onConfirm && onConfirm();
  };

  return ReactDOM.createPortal(
    status && (
      <div className={cx('backdrop')}>
        {animate && (
          <div
            className={cx('dialog', `animate__animated animate__faster ${animate}`)}
            style={{height: `calc(${device.height}px - 2rem)`}}>
            <div className={cx('header')}>
              <div onClick={handleCancel} className={cx('btn-cancel')}>
                {cancel}
              </div>
              <div className={cx('title')}>{title}</div>
              {confirm && (
                <div onClick={handleConfirm} className={cx('btn-confirm')}>
                  {confirm}
                </div>
              )}
            </div>
            <div className={cx('body')}>{children}</div>
          </div>
        )}
      </div>
    ),
    document.querySelector('#root')
  );
});

export default memo(Modal);
