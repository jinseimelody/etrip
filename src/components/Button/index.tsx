import classNames from 'classnames/bind';
import style from './style.module.scss';

type ButtonType = 'primary' | 'default';

type ButtonProps = {
  type: ButtonType | string;
  customClass?: string;
  children?: React.ReactNode;
  onClick?: () => any;
};

const cx = classNames.bind(style);
const Button: React.FC<ButtonProps> = ({onClick, customClass, children}) => {
  return (
    <button className={cx('btn', style, customClass)} onClick={() => onClick && onClick()}>
      {children}
    </button>
  );
};

export default Button;
