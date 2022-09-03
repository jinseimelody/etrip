import classNames from 'classnames/bind';

import styles from './input.group.module.scss';

const cx = classNames.bind(styles);
const InputGroup = ({children}) => {
  if (!children) return <></>;

  let items = Array.isArray(children) ? [...children] : [children];

  return (
    <div className={cx('input-group')}>
      {items.map((v, i) => (
        <div key={i} className={cx('input-group-item')}>
          {v}
        </div>
      ))}
    </div>
  );
};

export default InputGroup;
