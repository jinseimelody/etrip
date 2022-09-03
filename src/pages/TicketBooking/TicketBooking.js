/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './ticket.booking.module.scss';
import {Card, useToast} from '~/components';
import {Limousine} from '~/components/Bus';
import pipe from '~/helper';
import moment from 'moment';
import {tripApi} from '~/apis';
import bookingApi from '~/apis/booking.api';

const cx = classNames.bind(styles);

const TicketBooking = () => {
  const params = useParams();
  const toast = useToast();
  const [state, setState] = useState({
    busId: undefined,
    layoutId: undefined,
    price: 0,
    seats: [],
    chosen: [],
    total: 0
  });

  const {busId, layoutId, price, seats, chosen, total} = state;

  useEffect(() => {
    const abortController = new AbortController();
    const getSeats = async () => {
      const data = await tripApi.getOne({
        scheduleId: params.scheduleId,
        date: moment(params.date).format('yyyy-MM-DD')
      });

      console.log('state', data);

      setState({
        ...state,
        busId: data.busId,
        layoutId: data.layoutId,
        price: data.price,
        seats: data.seats
      });
    };

    getSeats();
    return () => abortController.abort();
  }, []);

  const handleSubmit = () => {
    bookingApi
      .create({
        scheduleId: params.scheduleId,
        date: moment(params.date).format('yyyy-MM-DD'),
        seatIds: chosen
      })
      .then(res => {
        console.log(res);
      });
  };

  return (
    <>
      <div className="flex flex-start flex-nowrap space-between mb-4">
        <div className="text-hero animate__animated animate__fadeInLeft">
          Let's pick your seats?
        </div>
        <div className="avatar"></div>
      </div>
      <div className="text-center text-small mb-3">
        <span className="text-bold">{busId && busId}:</span> Select{' '}
        {layoutId && layoutId} ({chosen.length}/3)
      </div>
      {
        {
          limousine: (
            <Limousine
              seats={seats}
              exceeded={3}
              onSelect={useCallback(
                chosen =>
                  setState({
                    ...state,
                    chosen: chosen,
                    total: price * chosen.length
                  }),
                [seats]
              )}
              onExceeded={useCallback(() => {
                const msg =
                  "You have reached the maximum number of seats purchased for this route. Can't choose more seats";
                toast.error(msg);
              }, [])}
            />
          )
        }[layoutId]
      }

      <Card style={{background: '#fafafa'}}>
        <div className="flex space-between mb-2">
          <div className="text-muted">Chosen</div>
          <div>{chosen.join(', ')}</div>
        </div>
        <div className="flex space-between">
          <div className="text-muted">Summary</div>
          <div className="text-title">{pipe.currency(total)}đ</div>
        </div>
      </Card>
      <div className="flex space-between mt-4 mb-4">
        <div className={cx('types', 'available')}>Available</div>
        <div className={cx('types', 'selected')}>Selected</div>
        <div className={cx('types', 'unavailable')}>Booked</div>
      </div>
      <div>
        <button className="btn-submit" onClick={handleSubmit}>
          Continue
        </button>
      </div>
    </>
  );
};
export default TicketBooking;
