import {IoIosArrowBack} from 'react-icons/io';
import classNames from 'classnames/bind';
import {Link} from 'react-router-dom';

import styles from './seat.selection.module.scss';
import {useEffect, useState} from 'react';
import {bookingApi} from '~/api';
import images from '~/assets';
import {Card} from '~/components';

const cx = classNames.bind(styles);
const SeatSelection = () => {
  const [storage, setStorage] = useState({});
  const [picked, setPicked] = useState(new Set());
  const [tab, setTab] = useState('');
  useEffect(() => {
    const fetch = async () => {
      const params = {scheduleId: 2, date: '2022-12-25'};
      const data = await bookingApi.placement(params);

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

        setStorage({
          ground: getTemplate(seats.filter(s => s.seatId.startsWith('A'))),
          upstairs: getTemplate(seats.filter(s => s.seatId.startsWith('B')))
        });
        setTab('ground');
      }
    };
    fetch();
  }, []);

  const handleTab = tabName => {
    setTab(tabName);
  };

  const handlePicking = seatId => {
    setPicked(prev => {
      const next = new Set(prev);
      if (prev.has(seatId)) {
        next.delete(seatId);
      } else {
        next.add(seatId);
      }
      return next;
    });
  };
  return (
    <div
      className={cx('wrapper')}
      style={{
        minHeight: '100vh'
      }}>
      <div
        className={cx('header')}
        style={{
          backgroundImage: `url('${images.myBackground}')`,
          backgroundRepeat: 'no-repeat'
        }}>
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
              onClick={() => {
                handleTab('ground');
              }}
              className={cx(['nav__item', {'nav__item--active': tab === 'ground'}])}>
              On Ground
            </div>
            <div
              onClick={() => {
                handleTab('upstairs');
              }}
              className={cx(['nav__item', {'nav__item--active': tab === 'upstairs'}])}>
              Upstairs
            </div>
          </div>
          <div className={cx('bus')}>
            {storage[tab] &&
              storage[tab].map((row, i) => {
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
                          if (seat.bookingId === null) handlePicking(seat.seatId);
                        }}
                        className={cx([
                          'seat',
                          {'seat--unavaliable': seat.bookingId !== null},
                          {
                            'seat--avaliable': !picked.has(seat.seatId) && seat.bookingId === null
                          },
                          {
                            'seat--selected': picked.has(seat.seatId)
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
            <div>A10, A13</div>
          </div>
          <div className="horizontal horizontal--space-between">
            <div className="text-muted">Summary</div>
            <div className="title">330,000 đ</div>
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
    </div>
  );
};
export default SeatSelection;
