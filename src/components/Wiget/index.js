import classNames from 'classnames/bind';

import styles from './wiget.module.scss';

const cx = classNames.bind(styles);
const Wiget = props => {
  const {layout, image, title, hashtag, statistic, styles} = props;

  return (
    <div className={cx('wiget')} style={styles}>
      {layout && (
        <>
          <div className={cx('wiget__header')}>
            {image && (
              <div className={cx('wiget__image')}>
                <img src={image} alt=""></img>
              </div>
            )}
          </div>
          <div className={cx('wiget__body')}>
            {hashtag && <span>{hashtag}</span>}
            {title && <div>{title}</div>}
          </div>
          <div className={cx('wiget__footer')}>
            <div>{statistic ? statistic : ' '}</div>
          </div>
        </>
      )}
      {!layout && <>{props.children}</>}
    </div>
  );
};
export default Wiget;
