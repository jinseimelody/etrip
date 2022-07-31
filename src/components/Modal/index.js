import {forwardRef, memo, useImperativeHandle, useState} from 'react';
import classNames from 'classnames/bind';
import style from './modal.module.scss';

const cx = classNames.bind(style);
const Modal = forwardRef((props, ref) => {
  const {initStatus, onConfirm, onCancel, cancel, confirm, title, children} = props;
  const [status, setStatus] = useState(initStatus ?? false);

  useImperativeHandle(ref, () => ({
    show: () => setStatus(true),
    hide: () => setStatus(false)
  }));

  const handleCancel = () => {
    setStatus(false);
    onCancel && onCancel();
  };

  const handleConfirm = () => {
    setStatus(false);
    onConfirm && onConfirm();
  };

  return (
    status && (
      <div className={cx('backdrop')}>
        <div className={cx('dialog')}>
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
      </div>
    )
  );
});

export default memo(Modal);
