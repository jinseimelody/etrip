// import {BiBell} from 'react-icons/bi';
import classNames from 'classnames/bind';

import styles from './header.module.scss';
import images from '~/assets';

const trans = (cx, [...globalStyle]) => {
  return cx + ' ' + globalStyle.join(' ');
};

const cx = classNames.bind(styles);

const Header = () => {
  return (
    <div className={cx('nav')}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a href="#">
        <img src={images.logo} alt="Etrip"></img>
      </a>
      <div className={cx('nav__action')}>
        <div>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#">
            <div className={cx('upload__btn')}>
              <img src={images.plus} alt="plus"></img>
              <span>Upload</span>
            </div>
          </a>
        </div>
        <button type="button" className={trans(cx('login__button'), ['ml-1'])}>
          Log in
        </button>
        {/* <BiBell /> */}
      </div>
    </div>
  );
};

export default Header;
