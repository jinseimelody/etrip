import moment from 'moment';
import React, {forwardRef, memo, useState} from 'react';
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io';
import classNames from 'classnames/bind';

import style from './calendar.module.scss';
import {useSwipeable} from 'react-swipeable';

const cx = classNames.bind(style);

const getDaysInMonth = date => {
  const start = date.clone().startOf('month').startOf('week');
  const calendar = Array(6)
    .fill()
    .map(x => []);

  for (let i = 0; i < 42; i++) {
    const current = start.clone();
    const row = Math.floor(i / 7);

    // date not in current month
    if (date.month() !== current.month()) {
      calendar[row].push(undefined);
      start.add(1, 'days');
      continue;
    }
    calendar[row].push(current);
    start.add(1, 'days');
  }
  return calendar;
};

const getDaysOfWeek = date => {
  let start = date.clone().startOf('isoweek');
  const end = date.clone().endOf('isoweek');
  const calendar = [];

  while (!start.isAfter(end, 'day')) {
    calendar.push(start.clone());
    start.add(1, 'day');
  }
  return calendar;
};

const Month = ({onSelect, value}) => {
  const [state, setState] = useState(() => {
    const month = value || moment();
    return {
      month,
      chosen: moment(value),
      calendar: getDaysInMonth(month)
    };
  });
  const {month, calendar, chosen} = state;

  const swipe = useSwipeable({
    onSwiped: eventData => {
      if (eventData.absX < 120) return;

      const direction = eventData.dir.toLocaleLowerCase();
      switch (direction) {
        case 'left':
          next();
          return;
        case 'right':
          prev();
          return;
        default:
          break;
      }
    }
  });

  const next = () => {
    const nextMonth = month.clone().endOf('month').add(1, 'days');
    setState({...state, month: nextMonth, calendar: getDaysInMonth(nextMonth)});
  };

  const prev = () => {
    const prevMonth = month.clone().startOf('month').subtract(1, 'days');
    return setState({...state, month: prevMonth, calendar: getDaysInMonth(prevMonth)});
  };

  const select = m => {
    if (!m || m.isBefore(moment())) return;
    setState({...state, chosen: m});
    onSelect && onSelect(m);
  };

  return (
    <div className={cx('month')} {...swipe}>
      <div className={cx('header')}>
        <div className={cx('title')}>{month.format('MMMM, yyyy')}</div>
        <div className={cx('actions')}>
          <button onClick={prev} className={cx('btn-action')}>
            <IoIosArrowBack />
          </button>
          <button onClick={next} className={cx('btn-action')}>
            <IoIosArrowForward />
          </button>
        </div>
      </div>
      <div className={cx('body')}>
        <div className={cx('days-name')}>
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        {calendar.map((row, i) => (
          <div key={i} className={cx('row')}>
            {row.map((m, j) => {
              let type = 'daypass';
              if (m && m.isSame(moment(), 'days')) type = 'today';
              if (m && m.isAfter(moment(), 'days')) type = 'future';
              if (m && chosen && m.isSame(chosen, 'days')) type = 'selected';

              return (
                <div key={j} className={cx('cell')}>
                  <span className={cx(type)} onClick={() => select(m)}>
                    {m && m.date()}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

const Week = ({onSelect, value}) => {
  const [state, setState] = useState({
    animate: '',
    chosen: value,
    calendar: getDaysOfWeek(value || moment())
  });
  const {animate, calendar, chosen} = state;

  const swipe = useSwipeable({
    onSwiped: eventData => {
      if (eventData.absX < 120) return;

      const direction = eventData.dir.toLocaleLowerCase();
      switch (direction) {
        case 'left':
          next();
          return;
        case 'right':
          prev();
          return;
        default:
          break;
      }
    }
  });

  const next = () => {
    const nextMonday = calendar[6].clone().add(1, 'day');
    setState({...state, calendar: getDaysOfWeek(nextMonday)});
  };

  const prev = () => {
    const preSunday = calendar[0].clone().subtract(1, 'day');
    setState({...state, calendar: getDaysOfWeek(preSunday)});
  };

  const select = m => {
    setState({...state, chosen: m});
    onSelect && onSelect(m);
  };

  return (
    <div className={cx('week', animate)} {...swipe}>
      <div className={cx('container')}>
        <div className={cx('pane')}>
          {calendar.map((x, i) => {
            let type = '';
            if (x.isBefore(moment(), 'day')) type = 'daypass';
            if (!chosen && x.isSame(moment(), 'day')) type = 'now';
            if (chosen && x.isSame(chosen, 'day')) type = 'now';

            return (
              <div
                key={i}
                className={cx('picker-item', type)}
                onClick={() => !x.isBefore(moment(), 'day') && select(x)}>
                <div className="month">{x.format('ddd')}</div>
                <div className="day">{x.format('DD')}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Calendar = forwardRef(({type, ...props}, ref) => {
  if (!type) return <></>;

  if (!['month', 'week'].includes(type)) return <></>;
  return {
    month: <Month {...props} />,
    week: <Week {...props} />
  }[type];
});

export default memo(Calendar);
