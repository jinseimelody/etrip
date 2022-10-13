import { BiBus } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoIosHeartEmpty } from "react-icons/io";
import { MdOutlineSchedule, MdOutlineSpaceDashboard } from "react-icons/md";
import classNames from "classnames/bind";

import style from './nav.module.scss'
import { useLayout } from "../Context";
import { useLocation, useNavigate } from "react-router-dom";
import { GroupWidget } from "~/components";
const cx = classNames.bind(style);

type NavItem = {
  key: any;
  content?: React.ReactNode;
  path: string;
};

type NavGroup = {
  name?: string;
  item?: NavItem;
  items?: NavItem[];
};

const MENU: NavGroup[] = [
  {
    item: {
      key: '6A9pD',
      content: <>< MdOutlineSpaceDashboard className={cx('icon')} /> DashBoard</>,
      path: '/m/dashboard'
    }
  },
  {
    name: 'Project',
    items: [
      {
        key: 'nyxMc',
        content: <>
          <HiOutlineLocationMarker className={cx('icon')} /> Trips</>,
        path: '/m/trips'
      },
      {
        key: 'OFwZG',
        content: <><MdOutlineSchedule className={cx('icon')} /> Schedule</>,
        path: '/m/schedule'
      },
      {
        key: '1gV84',
        content: <><BiBus className={cx('icon')} /> Bus</>,
        path: '/m/bus'
      }
    ]
  },
  {
    name: 'Games',
    items: [
      {
        key: '6A9pD',
        content: <><IoIosHeartEmpty className={cx('icon')} /> Card Games</>,
        path: '/m/cardGame'
      }
    ]
  }
];

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setNavOpen } = useLayout();

  const handleNavItemClick = (navItem: NavItem) => {
    setNavOpen(false);
    navigate(navItem.path);
  }

  return <>
    {MENU.map((group, i) => {
      const { name, item, items } = group;

      const renderNavItem = (navItem: NavItem) => (
        <div key={navItem.key} className={cx('nav-item', { active: location.pathname === navItem.path })} onClick={() => handleNavItemClick(navItem)}>
          {navItem.content}
        </div>
      );

      if (item) return renderNavItem(item);

      return (
        <GroupWidget key={i} groupName={name} className="text-title">
          {(items as NavItem[]).map(x => renderNavItem(x))}
        </GroupWidget>
      );
    })}
  </>
}

export default Nav;