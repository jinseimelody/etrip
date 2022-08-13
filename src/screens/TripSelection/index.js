import moment from 'moment';
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {IoIosArrowBack} from 'react-icons/io';
import classNames from 'classnames/bind';
import styles from './trip.selection.module.scss';

import {Calendar, Ticket} from '~/components';
import {storage, tripApi} from '~/api';
import {pipe} from '~/helper';

const cx = classNames.bind(styles);

const TripSelection = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [state, setState] = useState({
    from: params.from,
    to: params.to,
    date: moment(params.date),
    trips: []
  });
  const {from, to, date, trips} = state;

  useEffect(() => {
    // update storage
    const searches = storage.get('recentSearches');
    searches[searches.length - 1] = {from, to, date};
    storage.set('recentSearches', searches);

    // fetch new data
    const formatedDate = date.format('yyyy-MM-DD');
    navigate(`/search/${from}/${to}/${formatedDate}`);
    tripApi
      .search({
        from,
        to,
        date: formatedDate
      })
      .then(trips => {
        console.log(trips);
        setState({...state, trips});
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to, date]);

  return (
    <>
      <div className="header">
        <div className="action action-left">
          <div onClick={() => navigate(-1)}>
            <IoIosArrowBack />
          </div>
        </div>
        <div className="text-title">Trip selection</div>
      </div>

      <div className="container">
        <div className="flex flex-start flex-nowrap space-between my-4">
          <div className="text-hero">When do you want to leave?</div>
          <div className="avatar"></div>
        </div>

        <div className={cx('picker-container')}>
          <Calendar
            options={{mode: 'week'}}
            initValue={moment(params.date)}
            onSelect={value => setState({...state, date: value})}
          />
        </div>

        {trips &&
          trips.map((t, i) => (
            <Ticket key={i} onClick={() => alert('next')}>
              <Ticket.Top>
                <div className="flex space-between">
                  <div>{t.from}</div>
                  <div>{t.to}</div>
                </div>
                <div className="flex space-between">
                  <div className="text-heading">{pipe.time(t.start)}</div>
                  <div className="decorator"></div>
                  <div className="text-heading">{pipe.time(t.end)}</div>
                </div>
                <div className="flex space-between">
                  <div className="distance">
                    <span className="text-muted">Distance</span>
                    <div>
                      <span className="text-heading">{pipe.distance(t.distance).formated}</span>
                      &nbsp;
                      <span>{pipe.distance(t.distance).unit}</span>
                    </div>
                  </div>
                  <div className="travel-time">
                    <span className="text-muted">Travel time</span>
                    <div>
                      <span className="text-heading">{pipe.duration(t.travelTime).formated}</span>
                      &nbsp;
                      <span>{pipe.duration(t.travelTime).unit}</span>
                    </div>
                  </div>
                  <div className="distance">
                    <span className="text-muted">Price</span>
                    <div>
                      <span className="text-heading">{pipe.currency(t.price).formated}</span>
                      &nbsp;
                      <span>{pipe.currency(t.price).unit}</span>
                    </div>
                  </div>
                </div>
              </Ticket.Top>
              <Ticket.Bottom>
                <div className={cx('flex space-between')}>
                  <div>{t.layoutId}</div>
                  <div>{t.nonBookedCount} seats left</div>
                </div>
              </Ticket.Bottom>
            </Ticket>
          ))}
      </div>
    </>
  );
};
export default TripSelection;
