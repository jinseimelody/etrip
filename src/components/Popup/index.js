import {useState} from 'react';
import classNames from 'classnames/bind';

import styles from './popup.module.scss';

const cx = classNames.bind(styles);
const Popup = props => {
  const {triggered, title, children} = props;
  const [headerFixed, setHeaderFixed] = useState(false);

  const onScrollHandler = e => {
    const top = e.currentTarget.scrollTop;

    if (top <= 5 && headerFixed) {
      setHeaderFixed(false);
    }

    if (top > 5 && !headerFixed) {
      setHeaderFixed(true);
    }
  };

  return triggered ? (
    <div className={cx('popup')}>
      <div
        className={cx('popup__header', {'popup__header--fixed': headerFixed})}>
        <div className={cx('action')}>Hủy</div>
        <div className={cx('title')}>{title}</div>
        <div className={cx('action')}>Thêm</div>
      </div>
      <div
        onScroll={onScrollHandler}
        className={cx('popup__body')}
        style={{height: window.innerHeight - 65}}>
        {children}
      </div>
    </div>
  ) : (
    ''
  );
};

export default Popup;
