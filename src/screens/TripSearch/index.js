import {IoIosArrowBack} from 'react-icons/io';
import classNames from 'classnames/bind';
import {Link} from 'react-router-dom';

import styles from './tripsearch.module.scss';
import images from '~/assets';
import {BsCalendar4Week} from 'react-icons/bs';
import {FaCalendarAlt} from 'react-icons/fa';

const cx = classNames.bind(styles);
const TripSearch = () => {
  return (
    <div
      className={cx('wrapper')}
      style={{
        minHeight: '100vh',
        backgroundImage: `url('${images.myBackground}')`,
        backgroundRepeat: 'no-repeat'
      }}>
      <div className={cx('header')}>
        <div className={cx(['action', 'action--left'])}>
          <Link to="/dashboard">
            <IoIosArrowBack />
          </Link>
        </div>
        <div className={cx('title')}>Trip search</div>
      </div>
      <div className={cx('content')}>
        <div
          className="horizontal horizontal--space-between my-5"
          style={{alignItems: 'start'}}>
          <div style={{flexGrow: 1, fontWeight: 700, fontSize: '3rem'}}>
            Where do you want to go ?
          </div>
          <div
            style={{
              minWidth: '48px',
              height: '48px',
              marginLeft: '3rem',
              marginTop: '1.5rem',
              borderRadius: '1.5rem',
              background: 'wheat'
            }}></div>
        </div>

        <div className={cx('search-box')}>
          <div className="flex-1" style={{marginRight: '1.75rem'}}>
            <label className="vertical" htmlFor="from">
              <span className="text-muted mb-1">From</span>
              <input id="from" type="text" placeholder="Hà Nội"></input>
            </label>
            <div className={cx('rip')}></div>
            <label className="vertical" htmlFor="to">
              <span className="text-muted mb-1">To</span>
              <input id="to" type="text" placeholder="Cao Bằng"></input>
            </label>
          </div>
          <div className="horizontal">
            <button className={cx('btn-exchange')}>
              <img src={images.vExchange} alt="" />
            </button>
          </div>
        </div>

        <div style={{marginBottom: '2rem'}}>
          <label className="text-muted">Departure Date</label>
          <div
            className="horizontal"
            style={{position: 'relative', width: '80%'}}>
            <input
              type="text"
              placeholder="Sat, 23/07, 22"
              style={{
                minHeight: 'fit-content',
                padding: '1.75rem',
                paddingRight: '5.5rem',
                fontWeight: 700
              }}></input>
            <div
              style={{
                display: 'flex',
                padding: '0 1.75rem',
                position: 'absolute',
                right: '0'
              }}>
              <img src={images.calendar} alt=""></img>
            </div>
          </div>
        </div>

        <div>
          <Link to="/tripselection">
            <button
              style={{
                width: '100%',
                fontWeight: 700,
                padding: '2rem',
                borderRadius: '1.75rem',
                color: 'black',
                background: '#f9cf23'
              }}>
              Continue
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default TripSearch;
