import classNames from 'classnames/bind';
import {useState} from 'react';
import style from './style.module.scss';

const ON = 'on';
const OFF = 'off';
type Status = 'on' | 'off';

type SwipeButtonProps = {
  onClick?: (value: boolean) => any;
};

const cx = classNames.bind(style);
const SwipeButton: React.FC<SwipeButtonProps> = ({onClick}) => {
  const [status, setStatus] = useState<Status>(OFF);

  const handleButtonClick = () => {
    const nextStatus = status === ON ? OFF : ON;
    setStatus(nextStatus);
    onClick && onClick(nextStatus === ON);
  };

  return (
    <button className={cx('swipe-button', {on: status === ON})} onClick={handleButtonClick}>
      <span className={cx('stroke')}></span>
    </button>
  );
};

export default SwipeButton;
