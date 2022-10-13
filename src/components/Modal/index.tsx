import classNames from 'classnames/bind';
import {forwardRef, memo, useImperativeHandle, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import {useSelector} from 'react-redux';
import {IStore} from '~/interfaces';
import style from './style.module.scss';

const cx = classNames.bind(style);

type ModalProps = {
  title?: string;
  isConfirm?: boolean;
  children?: React.ReactNode;
  onCancel?: () => any;
  onConfirm?: () => any;
};

export type ModalRef = {
  show: () => any;
  close: () => any;
};

const Modal = forwardRef<ModalRef, ModalProps>(({title, isConfirm, onCancel, onConfirm, children}, ref) => {
  const device = useSelector((store: IStore) => store.device);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const backdropRef = useRef<any>();
  const modalRef = useRef<any>();

  useImperativeHandle(ref, () => ({
    show: () => setModalShow(true),
    close
  }));

  const close = () => {
    backdropRef.current.classList.replace(cx('animate__fadeIn'), cx('animate__fadeOut'));
    modalRef.current.classList.replace(cx('animate__slideInUp'), cx('animate__slideOutDown'));
    return new Promise((resolve: any) =>
      setTimeout(() => {
        setModalShow(false);
        resolve();
      }, 400)
    );
  };

  const handleCancelButton = () => {
    onCancel && onCancel();
    close();
  };

  const handleConfirmButton = () => {
    onConfirm && onConfirm();
  };

  const bodyHeight = `calc(${device.height}px - 77px)`;
  const root = document.querySelector('#root') as Element;

  return ReactDOM.createPortal(
    !modalShow ? null : (
      <>
        <div ref={modalRef} className={cx('modal', 'animate__animated animate__faster animate__slideInUp')}>
          <div className={cx('header')}>
            <div className={cx('btn-cancel')} onClick={handleCancelButton}>
              Cancel
            </div>
            <div className={cx('title')}>{title}</div>
            {isConfirm && (
              <div className={cx('btn-confirm')} onClick={handleConfirmButton}>
                Confirm
              </div>
            )}
          </div>
          <div className={cx('body')} style={{height: bodyHeight}}>
            <div>{children}</div>
          </div>
        </div>
        <div ref={backdropRef} className={cx('backdrop', 'animate__animated animate__faster animate__fadeIn')}></div>
      </>
    ),
    root
  );
});
export default memo(Modal);
