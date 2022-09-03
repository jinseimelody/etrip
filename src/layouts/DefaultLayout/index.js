import {Link, useLocation} from 'react-router-dom';
import {BsPerson} from 'react-icons/bs';
import {VscBell} from 'react-icons/vsc';
import {MdHistory} from 'react-icons/md';
import {IoIosArrowForward, IoIosMenu} from 'react-icons/io';
import {IoHomeOutline} from 'react-icons/io5';
import classNames from 'classnames/bind';

import style from './default.module.scss';
import manifest from './manifest.json';
const cx = classNames.bind(style);

const BottomNavBar = () => {
  const location = useLocation();
  const navigations = [
    {path: '/', name: 'Trang chủ', icon: <IoHomeOutline />},
    {path: '/bookinghistory', name: 'Vé của tôi', icon: <MdHistory />},
    {path: '/notification', name: 'Thông báo', icon: <VscBell />},
    {path: '/account', name: 'Tài khoản', icon: <BsPerson />}
  ];

  return (
    <div className={cx('bottom-nav')}>
      {navigations.map((navigation, i) => {
        const isActive = location.pathname === navigation.path;

        return (
          <Link key={i} to={navigation.path}>
            <div className={cx('bottom-nav-item', {'text-active': isActive})}>
              <div className="text-heading">{navigation.icon}</div>
              <div
                className={cx(
                  'text-small',
                  {'text-muted': !isActive},
                  {'text-active': isActive}
                )}>
                {navigation.name}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

const Header = () => {
  return (
    <div className={cx('header')}>
      <div className="flex">
        <IoIosMenu className="text-heading mr-3" />
        <Link to="/dashboard">
          <div className="text-heading">
            <span>Coetoris</span>
            <span className="text-danger">E</span>
          </div>
        </Link>
      </div>
      <Link to="/" className="flex text-title">
        Hello <IoIosArrowForward />
      </Link>
    </div>
  );
};

const Footer = () => {
  return (
    <div className={cx('footer')}>
      <div className={cx('general')}>
        <div className={cx('the-coding-gangz-logo')}>
          <span className={cx('git')}>Git</span>
          <span className={cx('hub')}>Hub</span>
        </div>
        <div className="text-title">The Coding Gangz</div>
        <div className="text-small text-muted">August, 2015</div>
      </div>

      <div className={cx('contact-me')}>
        <div className="text-title mb-3">Developer team</div>
        {manifest.members.map((x, i) => {
          return (
            <div key={i} className={cx('contact-card')}>
              <div
                className={cx('contact-card-image')}
                style={{background: 'wheat'}}></div>
              <div className={cx('contact-card-content')}>
                <div>{x.name}</div>
                <div className="text-small text-muted">{x.position}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const DefaultLayout = ({children}) => {
  return (
    <>
      <Header />
      <div className="container">{children}</div>
      <Footer />
      <BottomNavBar />
    </>
  );
};

export default DefaultLayout;
