import {useForm} from 'react-hook-form';
import {Link, useNavigate} from 'react-router-dom';
import {IoIosArrowBack, IoLogoGoogle} from 'react-icons/io';
import {FaApple} from 'react-icons/fa';
import classNames from 'classnames/bind';

import style from './login.module.scss';
import {regex} from '~/config/constant';
import {userApi} from '~/api';
import {useApp} from '~/context/AppContext';

const cx = classNames.bind(style);

const Login = () => {
  const navigate = useNavigate();
  const app = useApp();
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    watch,
    formState: {errors}
  } = useForm();

  const onSubmit = async data => {
    const response = await userApi.login(data);
    if (response.error) {
      setError('password', {type: 'server', message: response.error.message});
      return;
    }

    app.setToken(response);
    navigate('/dashboard');
  };

  return (
    <div className={cx('wrapper')} style={{height: window.innerHeight}}>
      <div className="header">
        <div className="action action-left" onClick={() => navigate(-1)}>
          <IoIosArrowBack />
        </div>
        <div className="text-title">Sign in to Etrip</div>
      </div>
      <div className="container">
        <div className="text-heading">Log In</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label className="text-muted">Login with one of the following options.</label>
            <div className="flex space-between">
              <button className={cx('social-login-button')}>
                <IoLogoGoogle />
              </button>
              <button className={cx('social-login-button')}>
                <FaApple />
              </button>
            </div>
          </div>

          {Object.keys(errors).length > 0 && (
            <div className="flex space-between rounded-1" style={{background: '#171717'}}>
              <div className="p-3">
                {Object.entries(errors).map(([key, error], i) => (
                  <div key={i}>{error.message}</div>
                ))}
              </div>
              <button
                className="self-stretch px-3 text-white"
                type="button"
                onClick={() => clearErrors()}>
                X
              </button>
            </div>
          )}

          <label>Email</label>
          <div className="flex mb-4">
            <input
              placeholder="sample@gmail.com"
              {...register('email', {
                pattern: {value: regex.email, message: 'Email pattern is invalid.'}
              })}></input>
          </div>

          <label>Password</label>
          <div className="flex mb-5">
            <input
              type="password"
              autoComplete="true"
              {...register('password', {
                required: {value: true, message: 'Password is required'},
                minLength: {value: 2, message: 'Password at least 2 characters.'}
              })}></input>
          </div>

          <button
            className={cx('login-button') + ' mb-4'}
            disabled={!watch('email') || !watch('password')}>
            Login
          </button>

          <div className="flex center">
            <span className="text-muted">Dont have an account? </span> &nbsp;
            <span>
              <Link to="/signup">Sign up</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
