/* eslint-disable react-hooks/exhaustive-deps */
import moment from 'moment';
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {push} from '~/redux/recentSearchSlice';
import {reset} from '~/redux/reservationSlice';
import React, {useCallback, useEffect, useRef, useState} from 'react';

import {Calendar} from '~/components';
import Filter from './Filter';
import classNames from 'classnames/bind';
import pipe from '~/helper';
import style from './search.module.scss';
import useSearch from './useSearch';
import {endpointApi} from '~/apis';

const cx = classNames.bind(style);

const Search = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const [exchange, setExchange] = useState({});
  const {departure, arrival} = exchange;

  const [query, setQuery] = useState({
    from: params.from,
    to: params.to,
    date: params.date
  });
  const [pageNumber, setPageNumber] = useState(1);
  const {trips, hasMore} = useSearch(query, pageNumber);

  const observer = useRef();
  const lastTicketRef = useCallback(
    node => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber(prev => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  useEffect(() => {
    dispatch(reset());

    const abortController = new AbortController();
    Promise.all([
      endpointApi.getOne(params.from, abortController),
      endpointApi.getOne(params.to, abortController)
    ]).then(value => {
      const [departure, arrival] = value;
      setExchange({departure, arrival});
    });

    return () => abortController.abort();
  }, []);

  useEffect(() => {
    if (departure && arrival)
      dispatch(
        push({departure, arrival, date: moment(query.date).toISOString()})
      );

    navigate(`/search/${query.from}/${query.to}/${query.date}`, {
      replace: true
    });
  }, [query]);

  const elements = trips.map((t, i) => {
    const start = moment(t.start, 'HH:mm:ss');
    let end = moment(t.end, 'HH:mm:ss');
    if (end.isBefore(start, 'hour')) end = end.add(1, 'days');

    return (
      <div
        ref={trips.length - 1 === i ? lastTicketRef : null}
        key={i}
        className={cx('ticket', {'ticket-even': i % 2 === 0})}>
        <div className="general">
          <div className="text-heading">{start.format('hh:mm A')}</div>
          <div className="text-muted mb-3">
            <div>
              {t.from} - {t.to}
            </div>
          </div>
          <div className="flex mb-3">
            <div className="ticket-image mr-4">
              <div className="s-image"></div>
            </div>
            <div>
              <div className="text-title">{t.nonBookedCount} seats left</div>
              <div className="text-muted text-capitalize">{t.layoutId}</div>
            </div>
          </div>
          <div className="text-muted">
            <span className="text-bold">{pipe.distance(t.distance)}</span>,
            arrival at{' '}
            <span className="text-bold">{end.format('hh:mm A')}</span>
          </div>
        </div>
        <div className="specific">
          <div>
            <div className="text-muted">
              Time:{' '}
              <span className="text-bold">
                {pipe.duration(end.diff(start, 'minute'))}
              </span>
            </div>
          </div>
          <div className="buy-ticket">
            <button
              onClick={() =>
                navigate(`/reservation/1/${t.scheduleId}/${query.date}`)
              }>
              Buy Ticket
            </button>
          </div>
          <div>
            <span className="text-small text-muted">Price: </span>
            <span className="text-title">{pipe.currency(t.price)}</span>đ
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="flex flex-start flex-nowrap space-between mb-4">
        <div className="text-hero animate__animated animate__fadeInLeft">
          When do you want to leave?
        </div>
        <div className="avatar"></div>
      </div>

      <div className={cx('calendar-container', 'box-shadow', 'mb-3')}>
        <Calendar
          type="week"
          value={moment(query.date)}
          onSelect={useCallback(m => {
            if (!m.isSame(query.date, 'day')) {
              setQuery(prev => ({...prev, date: m.format('yyyy-MM-DD')}));
            }
          }, [])}
        />
      </div>

      <div className={cx('filter-section')}>
        <div className="mb-3">
          <div className="flex space-between ">
            <div className="text-title">
              {departure && departure.name} - {arrival && arrival.name}
            </div>
            <div
              className="text-link cursor-pointer"
              onClick={() => navigate('/')}>
              Change
            </div>
          </div>
          <div className="text-small">
            {moment(query.date).format('dddd, DD/MM, yyyy')}
          </div>
        </div>

        <Filter
          onChange={useCallback(data => {
            setQuery(prev => ({...prev, ...data}));
            setPageNumber(1);
          }, [])}
        />
      </div>
      {elements}
    </>
  );
};

export default Search;
