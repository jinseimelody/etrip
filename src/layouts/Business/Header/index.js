import {Link} from 'react-router-dom';
import classNames from 'classnames/bind';
import jwtDecode from 'jwt-decode';

import styles from './header.module.scss';
import images from '~/assets';
import {useApp} from '~/context/AppContext';

const cx = classNames.bind(styles);

const Greeting = props => {
  const app = useApp();
  const {state} = app;

  if (state.token) {
    const decoded = jwtDecode(state.token.refreshToken);
    return <div>Hi {decoded.userId}</div>;
  }

  return (
    <Link to="/login">
      <button type="button" className={cx('login__button') + ' ml-1'}>
        Log in
      </button>
    </Link>
  );
};

const Header = () => {
  return (
    <div className={cx('nav')}>
      <Link to="/dashboard">
        <div className={cx('logo__container')}>
          <img src={images.coetorise} alt=""></img>
        </div>
      </Link>

      <div className={cx('action__container')}>
        <Greeting />
      </div>
    </div>
  );
};

export default Header;
