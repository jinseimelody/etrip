import classNames from 'classnames/bind';
import images from '~/assets';
import style from './style.module.scss';

const cx = classNames.bind(style);
const LogoWidget = () => {
  return (
    <>
      <div className={cx('logo')}>
        <img src={images.coetorise + ''} alt="" />
      </div>
      <div className="text-heading">
        <span>Coetoris</span>
        <span className="text-danger">E</span>
      </div>
    </>
  );
};

export default LogoWidget;
