import {ImShare2} from 'react-icons/im';
import {FaCog, FaRoute} from 'react-icons/fa';
import {BsFillCalendarWeekFill} from 'react-icons/bs';
import classNames from 'classnames/bind';

import mockup from '~/mockup/alias.json';
import images from '~/assets';
import styles from './trips.module.scss';
import {Link} from 'react-router-dom';
const cx = classNames.bind(styles);

const Trip = () => {
  const {endpoints, routes} = mockup;

  return (
    <>
      <div className="title">Route trips</div>
      <div className={cx('ticket')}>
        <div className={cx('ticket__header')}>
          <div className={cx('exchange__container')}>
            <div className={cx('start')}>
              <span>Hà Nội</span> <br />
            </div>
            <div className={cx('decorator')}></div>
            <div className={cx('end')}>
              <span>Cao Bằng</span> <br />
            </div>
          </div>

          <div className={cx('info__container')}>
            <div className={cx('distance')}>
              <span className="text-muted">Distance</span>
              <div>
                <span className={cx('title')}>20</span> &nbsp;
                <span>km</span>
              </div>
            </div>
            <div className={cx('travel__time')}>
              <span className="text-muted">Travel time</span>
              <div>
                <span className={cx('title')}>15</span> &nbsp;
                <span>min</span>
              </div>
            </div>
            <div className={cx('frequency')}>
              <span className="text-muted">Frequency</span>
              <div>
                <span className={cx('title')}>42</span> &nbsp;
                <span>per/day</span>
              </div>
            </div>
          </div>
        </div>
        <div className={cx('ticket__rip')}></div>
        <div className={cx('ticket__body')}>
          <div className={cx('control__container')}>
            <div className={cx('price__label')}>
              <span className={cx('title')}>350,000</span> <span>đ</span>
            </div>
            <Link to={'/schedule'}>
              <div className={cx('control')}>
                <BsFillCalendarWeekFill /> Schedule
              </div>
            </Link>
            <div className={cx('control')}>
              <FaCog /> Setting
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Trip;
