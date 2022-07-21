import {IoIosArrowBack} from 'react-icons/io';
import classNames from 'classnames/bind';
import {Link} from 'react-router-dom';

import styles from './seat.selection.module.scss';
import {useEffect, useState} from 'react';
import {bookingApi} from '~/api';
import images from '~/assets';

const cx = classNames.bind(styles);
const SeatSelection = () => {
  const [seats, setSeats] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      console.log('hello');
    };
    fetch();
  }, []);

  return (
    <div
      className={cx('wrapper')}
      style={{
        minHeight: '100vh'
      }}>
      <div
        className={cx('header')}
        style={{
          backgroundImage: `url('${images.myBackground}')`,
          backgroundRepeat: 'no-repeat'
        }}>
        <div className={cx(['action', 'action--left'])}>
          <Link to="/tripsearch">
            <IoIosArrowBack />
          </Link>
        </div>
        <div className={cx('title')}>Seat selection</div>
      </div>
      <div className={cx('content')}>
        <div className="horizontal horizontal--space-between my-4">
          <div className={cx(['types', 'types--avaliable'])}>Avaliable</div>
          <div className={cx(['types', 'types--selected'])}>Selected</div>
          <div className={cx(['types', 'types--unavaliable'])}>Unavaliable</div>
        </div>

        <div className={cx('bus__layout')}>
          <div className="horizontal horizontal--space-between mb-5">
            <div className={cx('seat')}>A01</div>
            <div className={cx('seat')}>A02</div>
          </div>
          <div className="horizontal horizontal--space-between mb-5">
            <div className={cx('seat')}>A03</div>
            <div className={cx('seat')}>A04</div>
            <div className={cx('seat')}>A05</div>
          </div>
          <div className="horizontal horizontal--space-between mb-5">
            <div className={cx('seat')}>A06</div>
            <div className={cx('seat')}>A07</div>
            <div className={cx('seat')}>A08</div>
          </div>
          <div className="horizontal horizontal--space-between my-5">
            <div className={cx('seat')}>A09</div>
            <div className={cx('seat')}>A10</div>
            <div className={cx('seat')}>A11</div>
          </div>
          <div className="horizontal horizontal--space-between my-5">
            <div className={cx('seat')}>A12</div>
            <div className={cx('seat')}>A13</div>
            <div className={cx('seat')}>A14</div>
          </div>
          <div className="horizontal horizontal--space-between">
            <div className={cx('seat')}>A15</div>
            <div className={cx('seat')}>A16</div>
            <div className={cx('seat')}>A17</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SeatSelection;
