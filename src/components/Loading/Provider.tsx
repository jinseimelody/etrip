import classNames from 'classnames/bind';
import React, {useState} from 'react';

import image from '~/assets';
import style from './style.module.scss';
import {LoadingContext} from './useLoading';

const cx = classNames.bind(style);
const LoadingProvider: React.FC<{children?: React.ReactNode}> = ({children}) => {
  const [state, setState] = useState('hide');

  const show = () => setState('show');
  const hide = () => setState('hide');

  const element = state === 'show' && (
    <div className={cx('backdrop')}>
      <div>
        <img alt="" src={image.cloudy}></img>
      </div>
    </div>
  );

  return (
    <LoadingContext.Provider value={{show, hide}}>
      {children}
      {element}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
