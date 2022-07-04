import classNames from 'classnames/bind';

import styles from './group.module.scss';

const cx = classNames.bind(styles);
const Group = props => {
  const {children} = props;

  let Comp = <div className={cx('input__group__item')}>{children}</div>;
  if (children.length) {
    Comp = children.map((v, i) => (
      <div key={i} className={cx('input__group__item')}>
        {v}
      </div>
    ));
  }
  return <div className={cx('input__group')}>{Comp}</div>;
};

export default Group;
