import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {IoIosArrowBack} from 'react-icons/io';
import classNames from 'classnames/bind';

import style from './signup.module.scss';
import {regex} from '~/config/constant';
import {storage, userApi} from '~/api';
import {useApp} from '~/context/AppContext';

const cx = classNames.bind(style);

const Signup = () => {
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
    const response = await userApi.register(data);
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
        <div className="text-title">Create an account</div>
      </div>
      <div className="container">
        <div className="flex flex-col flex-start flex-nowrap space-between my-4">
          <div className="text-hero">Welcome to Etrip!</div>
          <div className="text-muted">Let’s begin the adventure</div>
        </div>
        <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
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

          <label>Enter your email</label>
          <div className="flex mb-4">
            <input
              placeholder="sample@gmail.com"
              {...register('email', {
                pattern: {value: regex.email, message: 'Email pattern is invalid.'}
              })}></input>
          </div>

          <label>Create a password</label>
          <div className="flex mb-4">
            <input
              type="password"
              autoComplete="true"
              {...register('password', {
                required: {value: true, message: 'Password is required'},
                minLength: {value: 2, message: 'Password at least 2 characters.'}
              })}></input>
          </div>

          <label>
            Enter a username <span className="text-muted">(optional)</span>
          </label>
          <div className="flex mb-4">
            <input {...register('name')}></input>
          </div>

          <button
            className={cx('login-button') + ' my-4'}
            disabled={!watch('email') || !watch('password')}>
            Create account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
