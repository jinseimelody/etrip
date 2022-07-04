import classNames from 'classnames/bind';
import moment from 'moment';

import {Popup, Group} from '~/components';
import styles from './schedule.module.scss';

const cx = classNames.bind(styles);
const CrePopup = () => {
  return (
    <Popup title="Sự kiện mới" triggered={false}>
      <Group>
        <input type="text" placeholder="Tiêu đề" />
        <div>Vị trí hoặc cuộc gọi video</div>
      </Group>

      <Group>
        <div>Bắt đầu</div>
        <div>Kết thúc</div>
        <div>Lặp lại</div>
        <div>Thời gian di chuyển</div>
      </Group>

      <Group>
        <div>Lịch</div>
        <div>
          <textarea rows={3} placeholder="Ghi chú"></textarea>
        </div>
      </Group>
    </Popup>
  );
};

const Schedule = () => {
  const title = moment().format('LL');
  const mockup = Array(10)
    .fill(0)
    .map((x, i) => moment().add(i, 'day'));

  return (
    <>
      <div className="title">{title}</div>
      <div className={cx('calendar')}>
        <div className={cx('calendar__header')}>
          {mockup.map((d, i) => {
            const dayName = d.format('ddd');
            const day = d.format('dd');
            const isActive = false;

            console.log('result: ' + moment().diff(d, 'days') === 0);
            return (
              <div
                key={i}
                className={cx('day__span', {'day__span--active': isActive})}>
                <span>{dayName}</span>
                <div>{day}</div>
              </div>
            );
          })}
        </div>
        <div className={cx('calendar__body')}></div>
      </div>
      <div className={cx('wrapper')}>
        <CrePopup />
      </div>
    </>
  );
};
export default Schedule;
