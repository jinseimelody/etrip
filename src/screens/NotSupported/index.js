import classNames from 'classnames/bind';

import images from '~/assets';
import styles from './notsupprted.module.scss';
const cx = classNames.bind(styles);

const NotSupported = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <img src={images.oldMan} alt="App did not supported for your browser" />
        <div className="title my-5">Your browser too old!</div>
        <div className={cx('nav')} style={{minHeight: 150}}>
          <div>{navigator.userAgent}</div>
        </div>
      </div>
    </div>
  );
};

export default NotSupported;
