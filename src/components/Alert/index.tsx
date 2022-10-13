
import classNames from 'classnames/bind';
import style from './style.module.scss';

const cx = classNames.bind(style)
const Alert: React.FC<{ onClose?: () => any, children?: React.ReactNode }> = ({ onClose, children }) => {

    return <div className={cx('alert')}>
        <div className={cx('content')}>
            {children}
        </div>
        <button onClick={onClose}>X</button>
    </div>
}

export default Alert;