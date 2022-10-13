import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { VscArrowLeft } from 'react-icons/vsc';
import classNames from 'classnames/bind';
import ReactDOM from 'react-dom';

import { LogoWidget } from '~/components';
import { useLayout } from '~/layouts/AdminLayout/Context';
import style from './sidebar.module.scss';
import Nav from '../Nav';

const cx = classNames.bind(style);

const Sidebar = () => {
  const { navOpen, setNavOpen } = useLayout();
  const sidebarRef = useRef<any>();
  const overlayRef = useRef<any>();

  useEffect(() => {
    const overlay = overlayRef.current;
    const sidebar = sidebarRef.current;
    if (navOpen) {
      overlay.classList.add(cx('show'));
      sidebar.classList.add(cx('show'));
    } else {
      overlay.classList.remove(cx('show'));
      sidebar.classList.remove(cx('show'));
    }
  }, [navOpen]);

  const root = document.querySelector('#root') as Element;
  return ReactDOM.createPortal(
    <>
      <div ref={sidebarRef} className={cx('sidebar')}>
        <div className={cx('sidebar-header')}>
          <Link to="/m/dashboard">
            <LogoWidget />
          </Link>
          <button className={cx('btn-close')} onClick={() => setNavOpen(false)}>
            <VscArrowLeft />
          </button>
        </div>

        <div className={cx('sidebar-body')}>
          <Nav />
        </div>
        <div className={cx('sidebar-footer')}>Designed by JM</div>
      </div>
      <div ref={overlayRef} className={cx('overlay')} onClick={() => setNavOpen(false)}></div>
    </>,
    root
  );
};

export default Sidebar;
