import { IoIosArrowForward, IoIosMenu } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import style from './header.module.scss';
import { IStore } from '~/interfaces';

const cx = classNames.bind(style);
const Header = () => {
  const auth = useSelector((state: IStore) => state.auth);

  return (
    <div className={cx('header')}>
      <div className="flex">
        <IoIosMenu className="text-heading mr-3" />
        <Link to="/m/dashboard">
          <div className="text-heading">
            <span>Coetoris</span>
            <span className="text-danger">E</span>
          </div>
        </Link>
      </div>
      <div className="flex text-title">
        {auth && <><div className={cx('greeting')}>Hello {auth.userName}</div> <IoIosArrowForward /></>}
      </div>
    </div>
  );
};

export default Header;
