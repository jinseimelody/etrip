import moment from 'moment';
import {forwardRef, memo, useEffect, useRef, useState} from 'react';
import classNames from 'classnames/bind';

import style from './calendar.week.module.scss';
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io';
const cx = classNames.bind(style);

const getCalendar = date => {
  let start = date.clone().startOf('isoweek');
  const end = date.clone().endOf('isoweek');
  const calendar = [];

  while (!start.isAfter(end, 'day')) {
    calendar.push(start.clone());
    start.add(1, 'day');
  }
  return calendar;
};

const Week = forwardRef((props, ref) => {
  const didMount = useRef(false);
  const {onSelect, initValue} = props;
  const [value, setValue] = useState(initValue);
  const [calendar, setCalendar] = useState(getCalendar(initValue ?? moment()));

  useEffect(() => {
    didMount.current ? onSelect && onSelect(value) : (didMount.current = true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className={cx('picker')}>
      <div className={cx('action')}>
        <button
          onClick={() => {
            const preSunday = calendar[0].clone().subtract(1, 'day');
            setCalendar(getCalendar(preSunday));
          }}
          className={cx('btn-pre')}>
          <IoIosArrowBack />
        </button>
        <button
          onClick={() => {
            const nextMonday = calendar[6].clone().add(1, 'day');
            setCalendar(getCalendar(nextMonday));
          }}
          className={cx('btn-next')}>
          <IoIosArrowForward />
        </button>
      </div>
      {calendar.map((x, i) => {
        let type = '';
        if (x.isBefore(moment(), 'day')) type = 'daypass';
        if (!value && x.isSame(moment(), 'day')) type = 'now';
        if (value && x.isSame(value, 'day')) type = 'now';

        return (
          <div key={i} className={cx('picker-item', type)} onClick={_ => setValue(x)}>
            <div className="month">{x.format('ddd')}</div>
            <div className="day">{x.format('DD')}</div>
          </div>
        );
      })}
    </div>
  );
});

export default memo(Week);
