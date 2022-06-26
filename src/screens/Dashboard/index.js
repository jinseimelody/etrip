import {BsSearch} from 'react-icons/bs';
import classNames from 'classnames/bind';

import styles from './dashboard.module.scss';
import images from '~/assets';

const cx = classNames.bind(styles);

const Dashboard = () => {
  return (
    <div className={cx('dashboard')}>
      <div
        className={cx('card')}
        style={{
          borderBottom: '1px solid var(--grey)',
          boxShadow: '0px 6px 10px -6px hsla(var(--hue), var(--sat), 15%, 0.15)'
        }}>
        <div className={cx('h2')}>Dashboard</div>
        <div className={cx('search__box')}>
          <div className={cx('search__icon')}>
            <BsSearch />
          </div>
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div>
        <img src={images.chart} alt="Chart"></img>
      </div>
      <div style={{padding: '0 2rem'}}>
        <img src={images.chartInfo} alt="Chartinfo"></img>
      </div>
      <div className={cx('card')}>
        <div className={cx('h2')}>Recent statisical</div>
        <div className={cx('carousel__container')}>
          <div className={cx('carousel__item')}>
            <img src={images.iosWiget1} alt="Chart"></img>
          </div>
          <div className={cx('carousel__item')}>
            <img src={images.iosWiget2} alt="Chart"></img>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
