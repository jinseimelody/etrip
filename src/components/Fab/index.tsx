import {memo} from 'react';
import classNames from 'classnames/bind';
import style from './style.module.scss';

type FabButtonProps = {
  disabled?: boolean;
  children?: React.ReactNode;
  customClass?: string;
  onClick?: () => any;
};

type FabProps = {
  children?: React.ReactElement;
};

const cx = classNames.bind(style);
const Button: React.FC<FabButtonProps> = ({disabled, customClass, onClick, children}) => {
  return (
    <button disabled={disabled} className={cx('fab-button', customClass)} onClick={() => onClick && onClick()}>
      {children}
    </button>
  );
};

const Fav: React.FC<FabProps> = ({children}) => {
  return <div className={cx('fab-container')}>{children}</div>;
};

export default Object.assign(Fav, {Button: memo(Button)});
