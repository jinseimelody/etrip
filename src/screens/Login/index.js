import {Link} from 'react-router-dom';
import {IoIosArrowBack, IoLogoGoogle} from 'react-icons/io';
import {FaApple} from 'react-icons/fa';
import classNames from 'classnames/bind';

import {Nav} from '~/components';
import style from './login.module.scss';

const cx = classNames.bind(style);

const Login = () => {
  const logins = () => {
    alert('');
  };

  return (
    <div className={cx('wrapper')} style={{height: window.innerHeight}}>
      <div className={cx('content')}>
        <Nav>
          <Link to="/dashboard">
            <Nav.NavItem>
              <IoIosArrowBack /> Back
            </Nav.NavItem>
          </Link>
        </Nav>
        <div className="title mb-5">Log In</div>

        <div>
          <div className="mb-5">
            <label className="text-muted">
              Login with one of the following options.
            </label>
            <div className="horizontal horizontal--space-between">
              <button className={cx('social-login-button')}>
                <IoLogoGoogle />
              </button>
              <button className={cx('social-login-button')}>
                <FaApple />
              </button>
            </div>
          </div>

          <label>Email</label>
          <div className="row mb-4">
            <input type="text" placeholder="Jmelody@gmail.com"></input>
          </div>

          <label>Password</label>
          <div className="row mb-5">
            <input type="text" placeholder="Pick a strong password"></input>
          </div>

          <button className={cx('login-button') + ' mb-4'} onClick={logins}>
            Login
          </button>

          <div className="horizontal horizontal--center">
            <span className="text-muted">Dont have an account? </span> &nbsp;
            <span>Sign up</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
