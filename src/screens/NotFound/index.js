import {Link} from 'react-router-dom';
import classNames from 'classnames/bind';

import images from '~/assets';
import styles from './notfound.module.scss';
const cx = classNames.bind(styles);

const NotFound = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <img src={images.owl} alt="App did not supported for your browser" />
        <div className="heading">404 Everyone is sleeping!</div>
        <div className={cx('nav')} style={{minHeight: 150}}>
          <div>
            so we think you are lost, let this owl help your find your way out.
            Be nice and pat him.
          </div>
          <div>
            <Link to="/dashboad">
              <button type="button">Back home</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
