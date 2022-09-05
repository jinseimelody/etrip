import classNames from 'classnames/bind';
import {memo, useEffect, useState} from 'react';
import style from './limousine.module.scss';

const cx = classNames.bind(style);

const ground = 'ground';
const upstairs = 'upstairs';

const layoutMapping = arr => {
  if (!arr || arr.length !== 14) return null;

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

const Limousine = ({onSelect, onExceeded, value, seats, exceeded}) => {
  const [state, setState] = useState(() => ({
    view: ground,
    layout: {
      ground: layoutMapping(seats.filter(x => x.seatId.startsWith('A'))),
      upstairs: layoutMapping(seats.filter(x => x.seatId.startsWith('B')))
    },
    chosen: value ? new Set(value) : new Set()
  }));
  const {view, layout, chosen} = state;

  const setView = view => setState({...state, view});

  const select = seat => {
    if (!seat.available) return;

    // allow maximum 3 seat chosen
    const seats = new Set(chosen);
    if (!seats.has(seat.seatId) && seats.size === exceeded) {
      onExceeded();
      return;
    }

    // update seat status
    if (seats.has(seat.seatId)) {
      seats.delete(seat.seatId);
    } else {
      seats.add(seat.seatId);
    }

    setState({...state, chosen: seats});
    onSelect(Array.from(seats));
  };

  return (
    <div className={cx('limousine')}>
      <div className={cx('nav')}>
        <div
          onClick={() => setView(ground)}
          className={cx(['nav-item', {active: view === ground}])}>
          On Ground
        </div>
        <div
          onClick={() => setView(upstairs)}
          className={cx(['nav-item', {active: view === upstairs}])}>
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
                  i < layout[view].length
                    ? 'flex space-between mb-4'
                    : 'flex space-between'
                }>
                {row.map((seat, j) => (
                  <div
                    key={j}
                    onClick={() => select(seat)}
                    className={cx([
                      'seat',
                      {unavailable: !seat.available},
                      {
                        available: !chosen.has(seat.seatId) && seat.available
                      },
                      {
                        selected: chosen.has(seat.seatId)
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
  );
};

export default memo(Limousine);
