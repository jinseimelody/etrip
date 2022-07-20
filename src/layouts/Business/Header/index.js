import {Link} from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './header.module.scss';
import images from '~/assets';

const cx = classNames.bind(styles);

const Header = () => {
  return (
    <div className={cx('nav')}>
      <Link to="/dashboard">
        <div className={cx('logo__container')}>
          <img src={images.coetorise} alt=""></img>
        </div>
      </Link>

      <div className={cx('action__container')}>
        <Link to="/login">
          <button type="button" className={cx('login__button') + ' ml-1'}>
            Log in
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
