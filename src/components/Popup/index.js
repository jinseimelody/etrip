import {useState} from 'react';
import classNames from 'classnames/bind';

import styles from './popup.module.scss';

const cx = classNames.bind(styles);
const Popup = props => {
  const {trigger, setTrigger, title, closeButton, confirmButton, children} = props;
  const [fixed, setFixed] = useState(false);

  const scrollHandler = e => {
    const top = e.currentTarget.scrollTop;
    if (top <= 5 && fixed) {
      setFixed(false);
    }
    if (top > 5 && !fixed) {
      setFixed(true);
    }
  };

  return trigger ? (
    <div className={cx('popup')}>
      <div className={cx('popup__header', {'popup__header--fixed': fixed})}>
        <div className={cx('action')} onClick={() => setTrigger(false)}>
          {closeButton}
        </div>
        <div className="text-heading">{title}</div>
        <div className={cx('action')}>{confirmButton}</div>
      </div>
      <div onScroll={scrollHandler} className={cx('popup__body')}>
        {children}
      </div>
    </div>
  ) : (
    ''
  );
};

export default Popup;
