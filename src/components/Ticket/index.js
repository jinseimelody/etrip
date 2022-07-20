import classNames from 'classnames/bind';

import styles from './ticket.module.scss';

const cx = classNames.bind(styles);

const Top = props => {
  return <div className={cx('ticket__top')}>{props.children}</div>;
};

const Bottom = props => {
  return <div className={cx('ticket__bottom')}>{props.children}</div>;
};

const Ticket = props => {
  const {children} = props;
  let top = '';
  let bottom = '';

  if (children) {
    const components = children.length ? children : [children];
    top = components.filter(c => c.type.name === 'Top');
    bottom = components.filter(c => c.type.name === 'Bottom');
  }

  return (
    <div className={cx('ticket')}>
      {top}
      <div className={cx('ticket__rip')}></div>
      {bottom}
    </div>
  );
};
export default Object.assign(Ticket, {
  Top,
  Bottom
});
