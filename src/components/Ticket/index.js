import classNames from 'classnames/bind';
import React from 'react';

import styles from './ticket.module.scss';

const cx = classNames.bind(styles);

const Top = props => {
  return <div className={cx('ticket-top')}>{props.children}</div>;
};

const Bottom = props => {
  return <div className={cx('ticket-bottom')}>{props.children}</div>;
};

const Ticket = React.forwardRef((props, ref) => {
  const {children, ...attrs} = props;
  let top = '';
  let bottom = '';

  if (children) {
    const components = children.length ? children : [children];
    top = components.filter(c => c.type.name === 'Top');
    bottom = components.filter(c => c.type.name === 'Bottom');
  }

  return (
    <div ref={ref} {...attrs} className={cx('ticket')}>
      {top}
      <div className={cx('ticket-rip')}></div>
      {bottom}
    </div>
  );
});

export default Object.assign(Ticket, {
  Top,
  Bottom
});
