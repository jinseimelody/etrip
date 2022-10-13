import {FaApple} from 'react-icons/fa';
import {IoLogoGoogle} from 'react-icons/io';
import {FieldValues, useForm} from 'react-hook-form';
import classNames from 'classnames/bind';

import {Alert, FragmentHeader, useToast} from '~/components';
import {pattern} from '~/common/constant';
import {useValidate} from '~/hooks';
import authApi from '~/apis/auth.api';
import style from './login.module.scss';
import {useDispatch} from 'react-redux';
import {authActions} from '~/redux/slices';
import {useNavigate} from 'react-router-dom';

const cx = classNames.bind(style);

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    watch,
    formState: {errors}
  } = useForm();
  const {valid, messages} = useValidate({...errors});

  const submitCallback = async (form: FieldValues) => {
    const {email, password} = form;
    const response = await authApi.login({
      email,
      password
    });
    const {status, error, data} = response;

    const handle = {
      200: () => {
        const {userName, accessToken} = data;
        const roles = ['admin'] as string[];
        dispatch(authActions.save({userName, email, password, roles, accessToken}));
        if (roles.includes('admin')) return navigate('/m/dashboard', {replace: true});
        return navigate('/');
      },
      401: () => setError('email', {type: 'custom', message: error.message})
    }[status];
    typeof handle === 'function' && handle();
  };

  const handleException = () => {
    toast.show('This feature gonna be updated soon');
  };

  const validation = !valid && (
    <div className="mb-3">
      <Alert onClose={() => clearErrors()}>
        {messages.map((message, i) => (
          <div key={i}>{message}</div>
        ))}
      </Alert>
    </div>
  );

  return (
    <>
      <FragmentHeader title="Sign to Etrip" />
      <div className="container">
        <div className="text-heading">Log In</div>
        <div className="mb-3">
          <label className="text-muted">Login with one of the following options.</label>
          <div className="flex space-between">
            <button className={cx('social-login-button')} onClick={handleException}>
              <IoLogoGoogle />
            </button>
            <button className={cx('social-login-button')} onClick={handleException}>
              <FaApple />
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit(submitCallback)}>
          {validation}

          <label>Email</label>
          <div className="flex mb-3">
            <input
              placeholder="sample@gmail.com"
              {...register('email', {
                pattern: {
                  value: pattern.email,
                  message: 'Email pattern is invalid.'
                }
              })}></input>
          </div>

          <label>Password</label>
          <div className="flex mb-3">
            <input
              type="password"
              autoComplete="true"
              {...register('password', {
                required: {value: true, message: 'Password is required'},
                minLength: {value: 2, message: 'Password at least 2 characters.'}
              })}></input>
          </div>

          <button className={cx('login-button') + ' mb-3'} disabled={!watch('email') || !watch('password')}>
            Login
          </button>
        </form>

        <div className="flex center">
          <span className="text-muted">Donn't have an account? </span> &nbsp;
          <span>Sign up</span>
        </div>
      </div>
    </>
  );
};

export default Login;
