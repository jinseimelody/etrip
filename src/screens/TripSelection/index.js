import {IoIosArrowBack} from 'react-icons/io';
import classNames from 'classnames/bind';
import {Link} from 'react-router-dom';

import styles from './tripselection.module.scss';
import {Nav} from '~/components';
import Ticket from '~/components/Ticket';
import {useEffect, useState} from 'react';
import {bookingApi} from '~/api';
import pipe from '~/helper';

const cx = classNames.bind(styles);
const TripSelection = () => {
  const [trips, setTrips] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const params = {from: 1, to: 2, date: '2022-12-25'};
        const response = await bookingApi.search(params);
        console.log(response);
        setTrips(response);
      } catch (error) {
        console.log('failed to search', error);
      }
    };
    fetch();
  }, []);

  return (
    <>
      <Nav>
        <Link to="/tripsearch">
          <Nav.NavItem>
            <IoIosArrowBack /> Trip search
          </Nav.NavItem>
        </Link>
      </Nav>
      <div className="title">Trip selection</div>
      {trips &&
        trips.map((t, i) => (
          <Link key={i} to="/sample">
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
                      <span className={cx('title')}>
                        {pipe.distance(t.distance).formated}
                      </span>
                      &nbsp;
                      <span>{pipe.distance(t.distance).unit}</span>
                    </div>
                  </div>
                  <div className={cx('travel__time')}>
                    <span className="text-muted">Travel time</span>
                    <div>
                      <span className={cx('title')}>
                        {pipe.duration(t.travelTime).formated}
                      </span>
                      &nbsp;
                      <span>{pipe.duration(t.travelTime).unit}</span>
                    </div>
                  </div>
                  <div className={cx('distance')}>
                    <span className="text-muted">Price</span>
                    <div>
                      <span className={cx('title')}>
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
    </>
  );
};
export default TripSelection;
