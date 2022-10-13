/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useRef} from 'react';
import classNames from 'classnames/bind';

import style from './style.module.scss';

type CardControlProps = {
  expand?: boolean | undefined;
  action?: React.ReactNode;
  children?: React.ReactNode;
};

const cx = classNames.bind(style);

const CardControl: React.FC<CardControlProps> = ({expand, action, children}) => {
  const contentRef = useRef<any>();
  const actionRef = useRef<any>();

  useEffect(() => {
    if (expand === undefined) return;

    if (expand) {
      const offset = actionRef.current.offsetWidth;
      contentRef.current.style.marginLeft = `${offset}px`;
      contentRef.current.classList.add(cx('expand'));
      return;
    }

    contentRef.current.style.marginLeft = '0px';
    contentRef.current.classList.remove(cx('expand'));
  }, [expand]);

  return (
    <div className={cx('card-container')}>
      <div ref={actionRef} className={cx('actions-container')}>
        {action}
      </div>

      <div ref={contentRef} className={cx('content-container')}>
        {children}
      </div>
    </div>
  );
};

export default CardControl;
