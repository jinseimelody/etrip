import { ContactWidget, useToast } from '~/components';
import { HiMenuAlt3 } from 'react-icons/hi';
import { useLayout } from '../Context';

import style from './header.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

const Header = () => {
  const { setNavOpen } = useLayout();
  const toast = useToast();

  return (
    <div className={cx('header')}>
      <ContactWidget
        name="Melody Jinsei"
        url="https://tmdl.edu.vn/wp-content/uploads/2022/07/avatar-doi-dep-de-thuong-19.jpg"
        title="Content creator"
        onNameClick={() => toast.show('Coming soon')}
      />
      <button className={cx('btn-menu')} onClick={() => setNavOpen(true)}>
        <HiMenuAlt3 />
      </button>
    </div>
  );
};

export default Header;
