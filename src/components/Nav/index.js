import classNames from 'classnames/bind';

import styles from './nav.module.scss';

const cx = classNames.bind(styles);
const Nav = props => {
  const {children} = props;

  return <div className={cx('nav')}>{children}</div>;
};

const NavItem = props => {
  const {children} = props;
  return <div className={cx('nav__item')}>{children}</div>;
};

export default Object.assign(Nav, {NavItem});
