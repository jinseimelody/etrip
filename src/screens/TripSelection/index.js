import {IoIosArrowBack} from 'react-icons/io';
import classNames from 'classnames/bind';
import {Link} from 'react-router-dom';

import styles from './trip.selection.module.scss';
import Ticket from '~/components/Ticket';
import {useEffect, useState} from 'react';
import {bookingApi} from '~/api';
import pipe from '~/helper';
import images from '~/assets';

const cx = classNames.bind(styles);
const TripSelection = () => {
  const [trips, setTrips] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const params = {from: 1, to: 2, date: '2022-12-25'};
        const response = await bookingApi.search(params);
        setTrips(response);
      } catch (error) {
        console.log('failed to search', error);
      }
    };
    fetch();
  }, []);

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
          <Link to="/tripsearch">
            <IoIosArrowBack />
          </Link>
        </div>
        <div className={cx('title')}>Trip selection</div>
      </div>
      <div className={cx('content')}>
        <div
          className="horizontal horizontal--space-between my-5"
          style={{alignItems: 'start'}}>
          <div style={{flexGrow: 1, fontWeight: 700, fontSize: '3rem'}}>
            When do you want to leave?
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

        <div className={cx('picker')}>
          <div className={cx('picker-item', {'picker-item--daypass': true})}>
            <div className="month">Mon</div>
            <div className="day">21</div>
          </div>
          <div className={cx('picker-item', {'picker-item--daypass': true})}>
            <div className="month">Tue</div>
            <div className="day">22</div>
          </div>
          <div className={cx('picker-item', {'picker-item--daypass': true})}>
            <div className="month">Wed</div>
            <div className="day">23</div>
          </div>
          <div className={cx('picker-item', {'picker-item--daypass': true})}>
            <div className="month">Thu</div>
            <div className="day">24</div>
          </div>
          <div className={cx('picker-item', {'picker-item--now': true})}>
            <div className="month">Fri</div>
            <div className="day">25</div>
          </div>
          <div className={cx('picker-item')}>
            <div className="month">Sat</div>
            <div className="day">26</div>
          </div>
          <div className={cx('picker-item')}>
            <div className="month">Sun</div>
            <div className="day">27</div>
          </div>
        </div>
        {trips &&
          trips.map((t, i) => (
            <Link key={i} to="/seatselection">
              <Ticket>
                <Ticket.Top>
                  <div className="horizontal horizontal--space-between mb-2">
                    <div>{t.from}</div>
                    <div>{t.to}</div>
                  </div>
                  <div className="horizontal horizontal--space-between mb-2">
                    <div className="title">{pipe.time(t.start)}</div>
                    <div className={cx('decorator')}></div>
                    <div className="title">{pipe.time(t.end)}</div>
                  </div>
                  <div className={cx('horizontal horizontal--space-between')}>
                    <div className={cx('distance')}>
                      <span className="text-muted">Distance</span>
                      <div>
                        <span className="title">
                          {pipe.distance(t.distance).formated}
                        </span>
                        &nbsp;
                        <span>{pipe.distance(t.distance).unit}</span>
                      </div>
                    </div>
                    <div className={cx('travel__time')}>
                      <span className="text-muted">Travel time</span>
                      <div>
                        <span className="title">
                          {pipe.duration(t.travelTime).formated}
                        </span>
                        &nbsp;
                        <span>{pipe.duration(t.travelTime).unit}</span>
                      </div>
                    </div>
                    <div className={cx('distance')}>
                      <span className="text-muted">Price</span>
                      <div>
                        <span className="title">
                          {pipe.currency(t.price).formated}
                        </span>
                        &nbsp;
                        <span>{pipe.currency(t.price).unit}</span>
                      </div>
                    </div>
                  </div>
                </Ticket.Top>
                <Ticket.Bottom>
                  <div className={cx('horizontal horizontal--space-between')}>
                    <div>{t.layoutId}</div>
                    <div>{t.nonBookedCount} seats left</div>
                  </div>
                </Ticket.Bottom>
              </Ticket>
            </Link>
          ))}
      </div>
    </div>
  );
};
export default TripSelection;
