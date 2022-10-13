import classNames from 'classnames/bind';
import { url } from 'inspector';
import { Link, useNavigate } from 'react-router-dom';
import images from '~/assets';

import styles from './dashboard.module.scss';
const cx = classNames.bind(styles);


const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className='category-section'>
        <div className="text-heading mb-3">Category</div>
        <div className={cx('widget-container')}>
          <div className={cx('widget')} onClick={() => navigate('/m/endpoints')}>
            <div className={cx('content')} style={{ backgroundImage: `url(${images.endPoint})` }}>
            </div>
          </div>
          <div className={cx('widget')}>
            <div className={cx('content')}></div>
          </div>
          <div className={cx('widget-full')}>
            <div className={cx('content')}></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
