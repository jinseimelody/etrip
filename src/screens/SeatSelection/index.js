import {IoIosArrowBack} from 'react-icons/io';
import classNames from 'classnames/bind';
import {Link} from 'react-router-dom';

import styles from './seat.selection.module.scss';
import {useEffect, useReducer} from 'react';
import {bookingApi} from '~/api';
import images from '~/assets';
import {Card} from '~/components';
import pipe from '~/helper';

const cx = classNames.bind(styles);
const initState = {
  trip: {},
  layout: {},
  view: 'ground',
  chosen: {
    total: 0,
    seats: new Set()
  },
  popup: false
};

const actions = {
  init: 'init',
  picking: 'picking',
  changeTab: 'changeTab',
  closePopup: 'closePopup'
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.init:
      return action.payload;
    case actions.picking:
      const seatId = action.payload;
      const chosen = state.chosen;
      // allow maximum 3 seat chosen
      if (!chosen.seats.has(seatId) && chosen.seats.size === 3) return {...state, popup: true};

      // update seat status
      if (chosen.seats.has(seatId)) {
        chosen.seats.delete(seatId);
      } else {
        chosen.seats.add(seatId);
      }

      // re-calc total
      chosen.total = chosen.seats.size * state.trip.price;
      return {...state, chosen};
    case actions.changeTab:
      const tabName = action.payload;
      return {...state, view: tabName};
    case actions.closePopup:
      return {...state, popup: false};
    default:
      throw Error(`action ${action} is not valid`);
  }
};

const SeatSelection = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  const {layout, view, chosen, popup} = state;

  useEffect(() => {
    const fetch = async () => {
      const params = {scheduleId: 2, date: '2022-12-25'};
      const data = await bookingApi.placement(params);

      const {trip} = data;
      let layout = null;
      if (data.bus.layoutId === 'Limousine') {
        const seats = data.seats;
        const getTemplate = arr => {
          let next = 0;
          const layout = [
            [1, 0, 1],
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1]
          ].map(row =>
            row
              .map(x => {
                if (x === 0) return 0;
                const res = arr[next];
                next++;
                return res;
              })
              .filter(x => x !== 0)
          );
          return layout;
        };

        layout = {
          ground: getTemplate(seats.filter(s => s.seatId.startsWith('A'))),
          upstairs: getTemplate(seats.filter(s => s.seatId.startsWith('B')))
        };
      }

      dispatch({
        type: actions.init,
        payload: {
          ...initState,
          trip,
          layout
        }
      });
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
      {console.log('render')}
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
              onClick={() => dispatch({type: actions.changeTab, payload: 'ground'})}
              className={cx(['nav__item', {'nav__item--active': view === 'ground'}])}>
              On Ground
            </div>
            <div
              onClick={() => dispatch({type: actions.changeTab, payload: 'upstairs'})}
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
                          if (seat.bookingId === null)
                            dispatch({type: actions.picking, payload: seat.seatId});
                        }}
                        className={cx([
                          'seat',
                          {'seat--unavaliable': seat.bookingId !== null},
                          {
                            'seat--avaliable':
                              !chosen.seats.has(seat.seatId) && seat.bookingId === null
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
              <button onClick={() => dispatch({type: actions.closePopup})}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SeatSelection;
