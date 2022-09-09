/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import moment from 'moment';
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';

import style from './reservation.module.scss';
import {tripApi} from '~/apis';
import {Limousine, useToast} from '~/components';
import pipe from '~/helper';
import {setBus, setChosen} from '~/redux/reservationSlice';

const cx = classNames.bind(style);
const limitExceededMsg =
  "You have reached the maximum number of seats purchased for this route. Can't choose more seats";

const Reservation = () => {
  const navigate = useNavigate();
  const params = useParams();
  const toast = useToast();
  const {bus, chosen} = useSelector(state => state.reservation);
  const dispatch = useDispatch();

  useEffect(() => {
    const abortController = new AbortController();
    const getSeats = async () => {
      const data = await tripApi.getOne({
        scheduleId: params.scheduleId,
        date: moment(params.date).format('yyyy-MM-DD')
      });

      dispatch(setBus({...data}));
    };

    getSeats();
    return () => abortController.abort();
  }, []);

  const element = {
    limousine: (
      <Limousine
        value={chosen.seats}
        seats={bus.seats}
        exceeded={3}
        onSelect={seats =>
          dispatch(
            setChosen({
              seats: seats,
              total: bus.price * seats.length
            })
          )
        }
        onExceeded={() => toast.show(limitExceededMsg)}
      />
    )
  }[bus.layoutId];

  const handleSubmit = () => {
    if (chosen.seats.length > 0) {
      navigate(`/reservation/2/${params.scheduleId}/${params.date}`);
      return;
    }

    toast.show('Please pick at least a seat');
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
        <span className="text-bold">51B-421.55:</span> Select limousine (0/3)
      </div>
      <div>{element}</div>
      <div className="card bg-oldlace">
        <div className="flex space-between mb-2">
          <div className="text-muted mb-3">Chosen</div>
          <div>{chosen.seats.join(', ')}</div>
        </div>
        <div className="flex space-between">
          <div className="text-muted">Summary</div>
          <div className="text-title">{pipe.currency(chosen.total)}đ</div>
        </div>
      </div>
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
export default Reservation;
