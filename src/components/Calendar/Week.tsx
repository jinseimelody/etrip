import {CalendarProps, CalendarRef} from './interfaces';
import {forwardRef, useState} from 'react';
import classNames from 'classnames/bind';
import moment, {Moment} from 'moment';
import style from './style.module.scss';

const getDaysOfWeek = (date: any) => {
  let start = date.clone().startOf('isoweek');
  const end = date.clone().endOf('isoweek');
  const calendar = [];

  while (!start.isAfter(end, 'day')) {
    calendar.push(start.clone());
    start.add(1, 'day');
  }
  return calendar;
};

const cx = classNames.bind(style);
const Week = forwardRef<CalendarRef, CalendarProps>(({onSelect, value}, ref) => {
  const [state, setState] = useState({
    animate: '',
    chosen: value,
    calendar: getDaysOfWeek(value || moment())
  });
  const {animate, calendar, chosen} = state;

  const next = () => {
    const nextMonday = calendar[6].clone().add(1, 'day');
    setState({...state, calendar: getDaysOfWeek(nextMonday)});
  };

  const prev = () => {
    const preSunday = calendar[0].clone().subtract(1, 'day');
    setState({...state, calendar: getDaysOfWeek(preSunday)});
  };

  const select = (m: Moment) => {
    setState({...state, chosen: m});
    onSelect && onSelect(m);
  };

  return (
    <div className={cx('week', animate)}>
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
});

export default Week;
