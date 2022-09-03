import classNames from 'classnames/bind';

import styles from './card.module.scss';

const cx = classNames.bind(styles);
const Card = props => {
  const {children, ...rest} = props;
  return (
    <div className={cx('card')} {...rest}>
      {children}
    </div>
  );
};
export default Card;
