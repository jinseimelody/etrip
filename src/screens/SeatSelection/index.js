import {IoIosArrowBack} from 'react-icons/io';
import classNames from 'classnames/bind';
import {Link, useParams} from 'react-router-dom';

import styles from './seat.selection.module.scss';
import {useEffect, useReducer, useRef} from 'react';
import {tripApi, bookingApi} from '~/api';
import {Card, Toast} from '~/components';
import pipe from '~/helper';
import buslayout from '~/helper/bus.layout';
import reducer, {initState} from './reducer';
import {changeTab, init, picking} from './actions';

const cx = classNames.bind(styles);

const SeatSelection = () => {
  const params = useParams();
  const [state, dispatch] = useReducer(reducer, initState);
  const {layout, view, chosen} = state;
  const toastRef = useRef();

  useEffect(() => {
    tripApi.getOne({...params}).then(data => {
      const {seats, ...trip} = data;
      if (!buslayout.hasOwnProperty(trip.layoutId))
        throw new Error(`layout ${trip.layoutId} is not defined`);
      const layout = buslayout[trip.layoutId].init(seats);
      const newState = {
        ...initState,
        trip,
        layout
      };
      dispatch(init(newState));
    });
  }, []);

  const handleSelection = seat => {
    // allow maximum 3 seat chosen
    const chosen = state.chosen;
    if (!chosen.seats.has(seat.seatId) && chosen.seats.size === 3) {
      toastRef.current.showError(
        "You have reached the maximum number of seats purchased for this route. Can't choose more seats"
      );
      return;
    }

    seat.avaliable && dispatch(picking(seat.seatId));
  };

  const handleSubmit = _ => {
    const seats = [...state.chosen.seats];
    if (seats.length === 0) {
      toastRef.current.showError('Please choose a seats');
      return;
    }

    const body = {
      scheduleId: state.trip.scheduleId,
      date: state.trip.date,
      seatIds: seats
    };
    bookingApi.create(body).then(res => {
      if (!res.error) toastRef.current.show('Reservation successfully');

      const ground = state.layout.ground.map(row =>
        row.map(col => ({
          ...col,
          avaliable: col.avaliable === 1 && seats.includes(col.seatId) ? 0 : col.avaliable
        }))
      );
      const upstairs = state.layout.upstairs.map(row =>
        row.map(col => ({
          ...col,
          avaliable: col.avaliable === 1 && seats.includes(col.seatId) ? 0 : col.avaliable
        }))
      );
      dispatch(init({...state, chosen: {total: 0, seats: new Set()}, layout: {ground, upstairs}}));
    });
  };

  return (
    <div className={cx('wrapper')}>
      <Toast ref={toastRef} />
      <div className={cx('header')} style={{}}>
        <div className={cx(['action', 'action--left'])}>
          <Link to="/tripselection">
            <IoIosArrowBack />
          </Link>
        </div>
        <div className={cx('title')}>Seat selection</div>
      </div>
      <div className={cx('content')}>
        <div className={cx('limousine')}>
          <div className={cx('nav')}>
            <div
              onClick={() => dispatch(changeTab('ground'))}
              className={cx(['nav__item', {'nav__item--active': view === 'ground'}])}>
              On Ground
            </div>
            <div
              onClick={() => dispatch(changeTab('upstairs'))}
              className={cx(['nav__item', {'nav__item--active': view === 'upstairs'}])}>
              Upstairs
            </div>
          </div>
          <div className={cx('bus')}>
            {layout[view] &&
              layout[view].map((row, i) => {
                return (
                  <div
                    key={i}
                    className={
                      i === 0
                        ? 'horizontal horizontal--space-between'
                        : 'horizontal horizontal--space-between mt-4'
                    }>
                    {row.map((seat, j) => (
                      <div
                        key={j}
                        onClick={() => handleSelection(seat)}
                        className={cx([
                          'seat',
                          {'seat--unavaliable': !seat.avaliable},
                          {
                            'seat--avaliable': !chosen.seats.has(seat.seatId) && seat.avaliable
                          },
                          {
                            'seat--selected': chosen.seats.has(seat.seatId)
                          }
                        ])}>
                        {seat.seatId}
                      </div>
                    ))}
                  </div>
                );
              })}
          </div>
        </div>

        <Card style={{background: '#fafafa'}}>
          <div className="horizontal horizontal--space-between">
            <div className="text-muted">Chosen</div>
            <div>{Array.from(chosen.seats).join(', ')}</div>
          </div>
          <div className="horizontal horizontal--space-between">
            <div className="text-muted">Summary</div>
            <div className="title">
              {pipe.currency(chosen.total).formated} {pipe.currency(chosen.total).unit}
            </div>
          </div>
        </Card>
        <div className="horizontal horizontal--space-between my-4">
          <div className={cx(['types', 'types--avaliable'])}>Avaliable</div>
          <div className={cx(['types', 'types--selected'])}>Selected</div>
          <div className={cx(['types', 'types--unavaliable'])}>Booked</div>
        </div>
        <div>
          <button className="btn-submit" onClick={handleSubmit}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};
export default SeatSelection;
