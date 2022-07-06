import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import {IoIosArrowDown} from 'react-icons/io';
import Group from '../Group';

import styles from './popper.select.module.scss';

const cx = classNames.bind(styles);

const PopperSelect = props => {
  const {placeholder, children} = props;

  return (
    // <Tippy
    //   visible={true}
    //   render={attrs => (
    //     <div className={cx('tooltip')} tabIndex="-1">
    //       <div className={cx('option')}>Once</div>
    //       <div className={cx('option')}>Daily</div>
    //       <div className={cx('option')}>
    //         <input type="text"></input>
    //       </div>
    //     </div>
    //   )}>
    <div className={cx('select')}>
      {placeholder} <IoIosArrowDown />
    </div>
    // </Tippy>
  );
};

export default PopperSelect;
