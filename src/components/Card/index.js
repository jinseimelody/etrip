import classNames from 'classnames/bind';

import styles from './card.module.scss';

const cx = classNames.bind(styles);
const Wiget = props => {
  const {children} = props;
  return <div className={cx('card')}>{children}</div>;
};
export default Wiget;
