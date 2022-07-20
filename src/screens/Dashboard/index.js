import {Link} from 'react-router-dom';
import classNames from 'classnames/bind';
import {BsSearch} from 'react-icons/bs';

import {Wiget} from '~/components';
import styles from './dashboard.module.scss';
import images from '~/assets';

const cx = classNames.bind(styles);

const Dashboard = () => {
  return (
    <>
      <div className={cx('search__container')}>
        <div className="title">Dashboard</div>
        <div className={cx('search__box')}>
          <div className={cx('search__icon')}>
            <BsSearch />
          </div>
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div>
        <div className="title">Category</div>
        <div className={cx('wiget__container')}>
          <Link to="/trips">
            <Wiget
              layout={true}
              title="Trips of coetorise"
              image={images.route}
              hashtag="#readychanged"
              statistic="1,3B total"
              styles={{
                background: '#000'
              }}
            />
          </Link>
          <Link to="/tripsearch">
            <Wiget
              styles={{
                backgroundImage: `url('${images.wigetBackgroud}')`
              }}>
              <div
                style={{
                  color: '#fff'
                }}>
                <div className="title">Let's book a trip</div>
                <span
                  style={{
                    fontSize: '1.3rem',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '2.75rem',
                    background: 'rgb(255 92 0 / 70%)'
                  }}>
                  #doingourbest
                </span>
              </div>
            </Wiget>
          </Link>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
