import classNames from 'classnames/bind';
import moment from 'moment';

import styles from './bus.assign.module.sass';

const cx = classNames.bind(styles);
const BusAssign = () => {
  const title = moment().format('LL');
  const mockup = Array(10)
    .fill(0)
    .map((x, i) => moment().add(i, 'days'));

  const timelines = [
    '00:00',
    ...Array(24)
      .fill(0)
      .map((x, i) =>
        moment()
          .startOf('day')
          .add(i + 1, 'hours')
          .format('hh:mm')
      )
  ];

  return (
    <>
      <div className="text-heading">{title}</div>
      <div className={cx('calendar')}>
        <div className={cx('calendar__header')}>
          {mockup.map((d, i) => {
            const dayName = d.format('ddd');
            const day = d.format('D');
            return (
              <div
                key={i}
                className={cx('day__span', {
                  'day__span--active': d.isSame(moment(), 'day')
                })}>
                <span>{dayName}</span>
                <div>{day}</div>
              </div>
            );
          })}
        </div>
        <div className={cx('calendar__body')}>
          {timelines.map(x => (
            <div className={cx('timeline')}>
              <span className={cx('timespan')}>{x}</span>
              <div className={cx('spreadline')}></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default BusAssign;
