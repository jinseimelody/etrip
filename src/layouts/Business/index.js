import classNames from 'classnames/bind';

import Header from './Header';
import styles from './business.module.scss';

const cx = classNames.bind(styles);

const Business = ({children}) => {
  return (
    <div className={cx('wrapper')}>
      <Header />
      <div className={cx('content')}>{children}</div>
    </div>
  );
};

export default Business;
