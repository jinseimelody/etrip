/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import style from './style.module.scss';

type Prop = {
  className?: string;
  groupName?: string;
  children?: React.ReactNode;
};

const cx = classNames.bind(style);
const GroupWidget: React.FC<Prop> = ({ groupName, className, children }) => {
  const [toggle, setToggle] = useState<boolean>(true);

  return (
    <div className={cx('group-widget')}>
      <div className={cx('header', className)}>
        <span>{groupName}</span>
        <IoIosArrowForward className={cx('btn-toggle', { expand: toggle })} onClick={() => setToggle(!toggle)} />
      </div>
      <div className={cx('body', { collapsed: !toggle })}>
        {children}
      </div>
    </div>
  );
};

export default GroupWidget;
