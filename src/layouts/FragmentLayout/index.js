import {IoIosArrowBack} from 'react-icons/io';
import classNames from 'classnames/bind';

import style from './fragment.module.scss';
import {useNavigate} from 'react-router-dom';
const cx = classNames.bind(style);

const FragmentLayout = ({title, children}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className={cx('header')}>
        <IoIosArrowBack onClick={() => navigate(-1)} className={cx('action', 'action-left')} />
        <div className="text-title">{title}</div>
      </div>
      <div className="container">{children}</div>
    </>
  );
};

export default FragmentLayout;
