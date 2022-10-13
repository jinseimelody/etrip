import { IoIosArrowDown } from "react-icons/io";
import classNames from "classnames/bind";

import style from './style.module.scss';

type IProps = {
  url?: string,
  name?: string,
  title?: string,
  onNameClick?: () => any
}

const cx = classNames.bind(style);

const ContactWidget: React.FC<IProps> = (props) => {
  const { url, name, title, onNameClick } = props;

  return <div className={cx('contact-widget')}>
    <div className={cx('image')}>
      {url && <img src={url} alt="" />}
    </div>
    <div className={cx("content")}>
      <div className={cx("name")} onClick={onNameClick}>
        {name}
        <IoIosArrowDown />
      </div>
      <div className={cx('title')}>
        {title}
      </div>
    </div>
  </div>;
};

export default ContactWidget;
