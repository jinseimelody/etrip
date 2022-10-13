import {IoIosArrowBack} from 'react-icons/io';
import {ReactNode} from 'react';
import {useNavigate} from 'react-router-dom';
import classNames from 'classnames/bind';

import style from './style.module.scss';

const cx = classNames.bind(style);
const FragmentHeader: React.FC<{
  title?: string;
  action?: ReactNode;
}> = ({title, action}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className={cx('container')}>
        <IoIosArrowBack className={cx('action', 'action-left')} onClick={() => navigate(-1)} />
        <div className={cx('title')}>{title}</div>
        <div className={cx('action', 'action-right')}>{action}</div>
      </div>
    </>
  );
};

export default FragmentHeader;
