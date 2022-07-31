import moment from 'moment';
import classNames from 'classnames/bind';
import style from './calendar.module.scss';
import {forwardRef, memo, useImperativeHandle, useReducer} from 'react';
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io';

const cx = classNames.bind(style);
const initState = {
  date: null,
  value: null,
  calendar: []
};

const actions = {
  select: 'select',
  next: 'next',
  pre: 'pre'
};

const handleSelection = payload => {
  return {type: actions.select, payload};
};

const nextMonth = _ => {
  return {type: actions.next};
};

const preMonth = _ => {
  return {type: actions.pre};
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.select:
      return {...state, value: action.payload};
    case actions.next: {
      const date = state.date.clone().endOf('month').add(1, 'days');
      const calendar = getCalendar(date);
      return {...state, date, calendar};
    }
    case actions.pre: {
      const date = state.date.clone().startOf('month').subtract(1, 'days');
      const calendar = getCalendar(date);
      return {...state, date, calendar};
    }
    default:
      throw new Error(`action ${action} is invalid`);
  }
};

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

const Calendar = forwardRef((props, ref) => {
  const {initValue, options} = props;
  const [state, dispatch] = useReducer(reducer, initState, prev => {
    const date = initValue ?? moment();
    return {
      ...prev,
      value: initValue,
      date,
      calendar: getCalendar(date)
    };
  });

  useImperativeHandle(ref, () => ({
    getValue: () => state.value
  }));

  return (
    <div className={cx('calendar')}>
      {options.preview && state.value && (
        <div className="mb-3">
          Selected:
          <span className="text-muted"> {state.value.format('ddd, DD/MM, yyy')}</span>
        </div>
      )}
      <div className={cx('header')}>
        <div className={cx('title')}>{state.date.format('MMMM, yyyy')}</div>
        <div className={cx('actions')}>
          <button onClick={() => dispatch(preMonth())} className={cx('btn-action')}>
            <IoIosArrowBack />
          </button>
          <button onClick={() => dispatch(nextMonth())} className={cx('btn-action')}>
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

export default memo(Calendar);
