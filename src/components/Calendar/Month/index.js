import moment from 'moment';
import {forwardRef, memo, useEffect, useImperativeHandle, useReducer, useRef} from 'react';
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io';

import classNames from 'classnames/bind';
import style from './calendar.month.module.scss';
const cx = classNames.bind(style);

export const SELECT = 'select';
export const NEXT = 'next';
export const PRE = 'pre';

const getCalendar = date => {
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

const initState = {
  date: null,
  value: null,
  calendar: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case SELECT:
      return {...state, value: action.payload};
    case NEXT: {
      const date = state.date.clone().endOf('month').add(1, 'days');
      const calendar = getCalendar(date);
      return {...state, date, calendar};
    }
    case PRE: {
      const date = state.date.clone().startOf('month').subtract(1, 'days');
      const calendar = getCalendar(date);
      return {...state, date, calendar};
    }
    default:
      throw new Error(`action ${action} is invalid`);
  }
};

const handleSelection = payload => {
  return {type: SELECT, payload};
};

const next = _ => {
  return {type: NEXT};
};

const pre = _ => {
  return {type: PRE};
};
const Month = forwardRef((props, ref) => {
  const {onSelect, initValue} = props;
  const didMount = useRef(false);
  const [state, dispatch] = useReducer(reducer, initState, prev => {
    const date = initValue ?? moment();
    return {
      ...prev,
      value: initValue,
      date,
      calendar: getCalendar(date)
    };
  });

  useEffect(() => {
    didMount.current ? onSelect && onSelect(state.value) : (didMount.current = true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.value]);

  useImperativeHandle(ref, () => ({
    getValue: () => state.value
  }));

  return (
    <div className={cx('month')}>
      <div className={cx('header')}>
        <div className={cx('title')}>{state.date.format('MMMM, yyyy')}</div>
        <div className={cx('actions')}>
          <button onClick={() => dispatch(pre())} className={cx('btn-action')}>
            <IoIosArrowBack />
          </button>
          <button onClick={() => dispatch(next())} className={cx('btn-action')}>
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
        {state.calendar &&
          state.calendar.map((row, i) => (
            <div key={i} className={cx('row')}>
              {row.map((m, j) => {
                let type = 'daypass';
                if (m && m.isSame(moment(), 'days')) type = 'today';
                if (m && m.isAfter(moment(), 'days')) type = 'future';
                if (m && state.value && m.isSame(state.value, 'days')) type = 'selected';

                return (
                  <div key={j} className={cx('cell')}>
                    <span
                      className={cx(type)}
                      onClick={() => {
                        if (type === 'daypass' || !m) return;
                        dispatch(handleSelection(m));
                      }}>
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

export default memo(Month);
