import {IoIosArrowBack} from 'react-icons/io';
import classNames from 'classnames/bind';
import {Link} from 'react-router-dom';

import styles from './seat.selection.module.scss';
import {useEffect, useReducer} from 'react';
import {tripApi} from '~/api';
import {Card} from '~/components';
import pipe from '~/helper';
import buslayout from '~/helper/bus.layout';
import reducer, {initState} from './reducer';
import {changeTab, closePopup, init, picking} from './actions';

const cx = classNames.bind(styles);

const SeatSelection = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  const {layout, view, chosen, popup} = state;

  useEffect(() => {
    const fetch = async () => {
      const params = {scheduleId: 2, date: '2022-12-25'};
      const data = await tripApi.getOne(params);

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
    };

    fetch();
  }, []);

  return (
    <div className={cx('wrapper')}>
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
                        onClick={() => {
                          if (seat.avaliable) dispatch(picking(seat.seatId));
                        }}
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
          <button
            style={{
              width: '100%',
              fontWeight: 700,
              padding: '2rem',
              lineHeight: '1rem',
              borderRadius: '1.75rem',
              color: 'black',
              background: '#f9cf23'
            }}>
            Continue
          </button>
        </div>
      </div>
      {popup && (
        <div className={cx('overlay')}>
          <div className={cx('popup')}>
            <div className={cx('popup__header')}>Lỗi</div>
            <div className={cx('popup__content')}>
              Bạn đã đạt tối đạ số lượng ghế được mua cho tuyến này. Không thể chọn thêm ghế
            </div>
            <div>
              <button onClick={() => dispatch(closePopup())}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SeatSelection;
