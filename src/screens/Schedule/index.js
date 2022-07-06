import classNames from 'classnames/bind';
import {IoIosArrowBack, IoIosAdd, IoIosArrowDown} from 'react-icons/io';
import {Link} from 'react-router-dom';

import {Popup, Group, Card, Nav} from '~/components';
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
  return (
    <>
      <Nav>
        <Link to="/trips">
          <Nav.NavItem>
            <IoIosArrowBack /> Trips
          </Nav.NavItem>
        </Link>
      </Nav>

      <div className={cx('page__header')}>
        <div className="title">Hà Nội - Cao Bằng</div>
        <div className={cx('actions')}>
          <span className="text-muted">5 New Schedule For Today</span>
          <button>
            <IoIosAdd />
          </button>
        </div>
      </div>

      <div className={cx('page__filter')}>
        <div className={cx('select')}>
          Plan
          <IoIosArrowDown />
        </div>
      </div>
    </>
  );
};
export default Schedule;
