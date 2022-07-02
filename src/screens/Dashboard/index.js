import {Link} from 'react-router-dom';
import classNames from 'classnames/bind';
import {BsSearch} from 'react-icons/bs';

import {Wiget} from '~/components';
import styles from './dashboard.module.scss';
import images from '~/assets';

const cx = classNames.bind(styles);

const Dashboard = () => {
  return (
    <div className={cx('dashboard')}>
      <div
        className="card"
        style={{
          marginBottom: 0,
          borderBottom: '1px solid var(--grey)',
          boxShadow: '0px 6px 10px -6px hsla(var(--hue), var(--sat), 15%, 0.15)'
        }}>
        <div className="title">Dashboard</div>
        <div className={cx('search__box')}>
          <div className={cx('search__icon')}>
            <BsSearch />
          </div>
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className="card">
        <div className="title">Category</div>
        <div className={cx('wiget__container')}>
          <Link to="/trips">
            <Wiget
              title={'Trips of coetorise'}
              image={images.route}
              hashtag={'#readychanged'}
              statistic={'1,3B total'}
              styles={{
                background: '#000'
              }}
            />
          </Link>
          <Wiget
            styles={{
              backgroundImage: `url('${images.wigetBackgroud}')`
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
