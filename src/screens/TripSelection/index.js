import moment from 'moment';
import {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {IoIosArrowBack} from 'react-icons/io';

import classNames from 'classnames/bind';
import styles from './trip.selection.module.scss';
import pipe from '~/helper';
import {tripApi} from '~/api';
import {Calendar, Ticket} from '~/components';

const cx = classNames.bind(styles);
const TripSelection = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState(moment(params.date));
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    tripApi.search({...params, date: date.format('YYYY-MM-DD')}).then(response => {
      setTrips(response);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <div className={cx(['action', 'action--left'])}>
          <Link to="/tripsearch">
            <IoIosArrowBack />
          </Link>
        </div>
        <div className={cx('title')}>Trip selection</div>
      </div>
      <div className={cx('content')}>
        <div className="horizontal horizontal--space-between my-5" style={{alignItems: 'start'}}>
          <div style={{flexGrow: 1, fontWeight: 700, fontSize: '3rem'}}>
            When do you want to leave?
          </div>
          <div className="avatar"></div>
        </div>

        <div className={cx('picker-container')}>
          <Calendar
            options={{mode: 'week'}}
            initValue={moment(params.date)}
            onSelect={val => setDate(val)}
          />
        </div>

        {trips &&
          trips.map((t, i) => (
            <Ticket
              key={i}
              onClick={() =>
                navigate(`/seatselection/${t.scheduleId}/${date.format('YYYY-MM-DD')}`)
              }>
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
                      <span className="title">{pipe.distance(t.distance).formated}</span>
                      &nbsp;
                      <span>{pipe.distance(t.distance).unit}</span>
                    </div>
                  </div>
                  <div className={cx('travel__time')}>
                    <span className="text-muted">Travel time</span>
                    <div>
                      <span className="title">{pipe.duration(t.travelTime).formated}</span>
                      &nbsp;
                      <span>{pipe.duration(t.travelTime).unit}</span>
                    </div>
                  </div>
                  <div className={cx('distance')}>
                    <span className="text-muted">Price</span>
                    <div>
                      <span className="title">{pipe.currency(t.price).formated}</span>
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
          ))}
      </div>
    </div>
  );
};
export default TripSelection;
