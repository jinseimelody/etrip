import {IoIosArrowBack} from 'react-icons/io';
import classNames from 'classnames/bind';
import {Link} from 'react-router-dom';

import styles from './tripsearch.module.scss';
import {Card, Nav} from '~/components';
import Ticket from '~/components/Ticket';
import {useEffect, useState} from 'react';
import {bookingApi} from '~/api';
import pipe from '~/helper';
import image from '~/assets';

const cx = classNames.bind(styles);
const TripSearch = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <div className={cx(['action', 'action--left'])}>
          <Link to="/dashboard">
            <IoIosArrowBack />
          </Link>
        </div>
        <div className={cx('title')}>Trip search</div>
      </div>
      <div className={cx('content')}>
        <div
          className="horizontal horizontal--space-between my-5"
          style={{alignItems: 'start'}}>
          <div style={{flexGrow: 1, fontWeight: 700, fontSize: '3rem'}}>
            Where do you want to go ?
          </div>
          <div
            style={{
              minWidth: '48px',
              height: '48px',
              marginLeft: '3rem',
              marginTop: '1.5rem',
              borderRadius: '1.5rem',
              background: 'wheat'
            }}></div>
        </div>

        <div className={cx('search-box')}>
          <div className="flex-1 mr-3">
            <label className="vertical" for="from">
              <span className="text-muted mb-1">From</span>
              <input id="from" type="text" placeholder="Hà Nội"></input>
            </label>
            <div className={cx('rip')}></div>
            <label className="vertical" for="to">
              <span className="text-muted mb-1">To</span>
              <input id="to" type="text" placeholder="Cao Bằng"></input>
            </label>
          </div>
          <div className="horizontal">
            <button className={cx('btn-exchange')}>
              <img src={image.vExchange} alt="" />
            </button>
          </div>
        </div>

        <div>
          <label className="text-muted">Departure Date</label>
          <div
            className="horizontal"
            style={{position: 'relative', width: '60%'}}>
            <input
              type="text"
              placeholder="Sat, 23/07, 22"
              style={{
                paddingRight: '3.6rem',
                fontWeight: 700
              }}></input>
            <div
              style={{
                padding: '0 1rem',
                position: 'absolute',
                right: '0'
              }}>
              <img src={image.calendar} alt=""></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TripSearch;
