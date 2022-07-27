import classNames from 'classnames/bind';
import style from './modal.module.scss';

const cx = classNames.bind(style);
const Modal = props => {
  const {onClose, cancel, confirm, title, children} = props;
  return (
    <div className={cx('backdrop')}>
      <div className={cx('dialog')}>
        <div className={cx('header')}>
          {cancel && (
            <div onClick={() => onClose()} className={cx('btn-cancel')}>
              {cancel}
            </div>
          )}
          <div className={cx('title')}>{title}</div>
          {confirm && <div className={cx('btn-confirm')}>{confirm}</div>}
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
