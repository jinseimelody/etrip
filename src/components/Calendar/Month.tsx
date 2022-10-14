import {forwardRef, useState} from 'react';
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io';
import classNames from 'classnames/bind';
import moment, {Moment} from 'moment';
import style from './style.module.scss';

import {CalendarProps, CalendarRef} from './interfaces';

const getDaysInMonth = (date: Moment) => {
  const start = date.clone().startOf('month').startOf('week');
  const calendar = Array(6)
    .fill(undefined)
    .map(x => []) as any;

  for (let i = 0; i < 42; i++) {
    const current: Moment = start.clone();
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

const cx = classNames.bind(style);

const Month = forwardRef<CalendarRef, CalendarProps>(({onSelect, value}, ref) => {
  const [state, setState] = useState(() => {
    const month: Moment = value || moment();
    return {
      month,
      chosen: moment(value),
      calendar: getDaysInMonth(month)
    };
  });
  const {month, calendar, chosen} = state;

  const next = () => {
    const nextMonth = month.clone().endOf('month').add(1, 'days');
    setState({...state, month: nextMonth, calendar: getDaysInMonth(nextMonth)});
  };

  const prev = () => {
    const prevMonth = month.clone().startOf('month').subtract(1, 'days');
    return setState({...state, month: prevMonth, calendar: getDaysInMonth(prevMonth)});
  };

  const select = (m: any) => {
    if (!m || m.isBefore(moment())) return;
    setState({...state, chosen: m});
    onSelect && onSelect(m);
  };

  return (
    <div className={cx('month')}>
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
        {calendar.map((row: any, i: number) => (
          <div key={i} className={cx('row')}>
            {row.map((m: any, j: number) => {
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
});

export default Month;
