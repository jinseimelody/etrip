import classNames from 'classnames/bind';
import styles from './bussiness.module.scss';
import Header from './Header';

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
