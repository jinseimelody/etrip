import {useState} from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames/bind';
import {IoIosArrowBack, IoIosAdd} from 'react-icons/io';
import {GoPrimitiveDot} from 'react-icons/go';
import {FaRegClock} from 'react-icons/fa';

import {Popup, Group, Card, Nav, PopperSelect} from '~/components';
import styles from './schedule.module.scss';

const cx = classNames.bind(styles);

const Schedule = () => {
  const [popup, setPopup] = useState(false);
  const [delPopup, setDelPopup] = useState(false);

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
          <button onClick={() => setPopup(true)}>
            <IoIosAdd />
          </button>
        </div>
      </div>

      <div className={cx('page__filter')}>
        <PopperSelect placeholder="Plan" />
        <PopperSelect placeholder="Sort: Timeline" />
      </div>
      <hr />

      <div className={cx('page__body')}>
        <div className="row sub-title mt-3">
          <GoPrimitiveDot style={{color: '#57b79d'}} />
          Daily
        </div>
        <Card
          style={{cursor: 'pointer'}}
          onClick={() => {
            setDelPopup(delPopup);
          }}>
          <div className="horizontal horizontal--space-between">
            <div>
              <span className="text-muted">Time</span>
              <div className="row">
                <FaRegClock />
                <span className="">&nbsp; 13:00 - 17:00</span>
              </div>
            </div>
            <div className="align-self--start">
              <div className="row">
                <GoPrimitiveDot style={{color: '#57b79d'}} />
                <div>Daily</div>
              </div>
            </div>
          </div>
        </Card>
        <div className="row sub-title">
          <GoPrimitiveDot style={{color: '#fd8fa9'}} />
          Once
        </div>
        <Card
          style={{cursor: 'pointer'}}
          onClick={() => {
            setDelPopup(delPopup);
          }}>
          <div className="horizontal horizontal--space-between">
            <div className="sub-title">Holiday: Christmas</div>
          </div>
          <div className="horizontal horizontal--space-between">
            <div>
              <span className="text-muted">Time</span>
              <div className="row">
                <FaRegClock />
                <span className="">&nbsp; 13:00 - 17:00</span>
              </div>
            </div>
            <div className="align-self--start">
              <span className="text-muted">Day</span>
              <div className="row">
                <GoPrimitiveDot style={{color: '#fd8fa9'}} />
                <div>25.12.2022</div>
              </div>
            </div>
          </div>
        </Card>
        <Card
          style={{cursor: 'pointer'}}
          onClick={() => {
            setDelPopup(delPopup);
          }}>
          <div className="horizontal horizontal--space-between">
            <div className="sub-title">Holiday: Christmas</div>
          </div>
          <div className="horizontal horizontal--space-between">
            <div>
              <span className="text-muted">Time</span>
              <div className="row">
                <FaRegClock />
                <span className="">&nbsp; 13:00 - 17:00</span>
              </div>
            </div>
            <div className="align-self--start">
              <span className="text-muted">Day</span>
              <div className="row">
                <GoPrimitiveDot style={{color: '#fd8fa9'}} />
                <div>25.12.2022</div>
              </div>
            </div>
          </div>
        </Card>
        <Card
          style={{cursor: 'pointer'}}
          onClick={() => {
            setDelPopup(delPopup);
          }}>
          <div className="horizontal horizontal--space-between">
            <div className="sub-title">Holiday: Christmas</div>
          </div>
          <div className="horizontal horizontal--space-between">
            <div>
              <span className="text-muted">Time</span>
              <div className="row">
                <FaRegClock />
                <span className="">&nbsp; 13:00 - 17:00</span>
              </div>
            </div>
            <div className="align-self--start">
              <span className="text-muted">Day</span>
              <div className="row">
                <GoPrimitiveDot style={{color: '#fd8fa9'}} />
                <div>25.12.2022</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Popup
        title="Sự kiện mới"
        closeButton="Hủy"
        confirmButton="Thêm"
        trigger={popup}
        setTrigger={setPopup}>
        <Group>
          <div>Lặp lại</div>
          <div>Ngày</div>
          <input type="text" placeholder="Tiêu đề" />
        </Group>

        <Group>
          <div>Bắt đầu</div>
          <div>Kết thúc</div>
          <div>
            <textarea rows={3} placeholder="Ghi chú"></textarea>
          </div>
        </Group>
      </Popup>

      <Popup
        title="Chi tiết sự kiện"
        closeButton="Quay lại"
        confirmButton="Sửa"
        trigger={delPopup}
        setTrigger={setDelPopup}>
        <Group>
          <div>Lặp lại</div>
          <div>Ngày</div>
          <input type="text" placeholder="Tiêu đề" />
        </Group>

        <Group>
          <div>Bắt đầu</div>
          <div>Kết thúc</div>
          <div>
            <textarea rows={3} placeholder="Ghi chú"></textarea>
          </div>
        </Group>
      </Popup>
    </>
  );
};
export default Schedule;
