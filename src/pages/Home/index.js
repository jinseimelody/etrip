import React, {useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {clear, push} from '~/redux/recentSearchSlice';
import {IoIosArrowForward} from 'react-icons/io';
import classNames from 'classnames/bind';

import {TripSearchWidget} from '~/pages/Shared';
import style from './home.module.scss';
import image from '~/assets';
import moment from 'moment';
import mockup from './manifest.json';

const cx = classNames.bind(style);

const Home = () => {
  const search = useSelector(state => state.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchBox = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    // make sure all form fields are filled
    const form = searchBox.current.getState();
    const {departure, arrival, date} = form;

    for (let [key, value] of Object.entries({departure, arrival, date})) {
      if (value) continue;

      searchBox.current.openPopup(key);
      return;
    }

    dispatch(push({...form, date: form.date.toISOString()}));
    navigate(
      `/search/${departure.id}/${arrival.id}/${date.format('yyyy-MM-DD')}`
    );
  };

  return (
    <>
      <div className="flex flex-start flex-nowrap space-between mb-4">
        <div className="text-hero animate__animated animate__fadeInLeft">
          Where do you want to go ?
        </div>
        <div className="avatar"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <TripSearchWidget ref={searchBox} data={search.current} />
        <div className="mb-5">
          <button className="btn-submit">Continue</button>
        </div>
      </form>

      {search.recent.length > 0 && (
        <RecentSearch
          onSelect={form => {
            const {departure, arrival, date} = form;
            dispatch(
              push({
                ...form,
                date: typeof date === 'string' ? date : date.toISOString()
              })
            );
            navigate(
              `/search/${departure.id}/${arrival.id}/${date.format(
                'yyyy-MM-DD'
              )}`
            );
          }}
          onClear={() => dispatch(clear())}
          data={search.recent}
        />
      )}

      <PopularTrips />

      <Advertisement />
    </>
  );
};

const RecentSearch = React.memo(({onSelect, onClear, data}) => {
  return (
    <div>
      <div className="flex space-between mt-5">
        <div className="text-heading">Recent Search</div>
        <div className="text-link" onClick={onClear}>
          Clear all
        </div>
      </div>

      <div className={cx('recent-search-section')}>
        <div className="scroll-y-container">
          <div className="scroll-content">
            {data.map((recent, i) => {
              return (
                <div
                  key={i}
                  className={cx('recent-card')}
                  onClick={() =>
                    onSelect({
                      ...recent,
                      date:
                        typeof recent.date === 'string'
                          ? moment(recent.date)
                          : recent.date
                    })
                  }>
                  <div>
                    <div className="flex text-bold">
                      <div className="icon icon-sm mr-2">
                        <img src={image.circleMarker} alt="" />
                      </div>
                      <div className={cx('recent-from')}>
                        {recent.departure.name}
                      </div>
                    </div>
                    <div className="flex text-bold">
                      <div className="icon icon-sm mr-2">
                        <img src={image.circleMarkerEnd} alt="" />
                      </div>
                      <div className={cx('recent-to')}>
                        {recent.arrival.name}
                      </div>
                    </div>
                    <div className={cx('recent-date', 'text-small text-muted')}>
                      {moment(recent.date).format('dddd, DD/MM, yy')}
                    </div>
                  </div>
                  <div>
                    <IoIosArrowForward />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});

const PopularTrips = React.memo(() => {
  const palette = ['#e3b597', '#7e3a3d', '#d05a42', '#2f2936', '#0d0d12'];
  return (
    <div>
      <div className="flex space-between">
        <div className="text-heading">Tuyến đường phổ biến</div>
      </div>

      <div className={cx('popular-section')}>
        <div className="scroll-y-container">
          <div className="scroll-content">
            {mockup.popularTrips.map((x, i) => {
              const background =
                palette[(() => Math.floor(Math.random() * palette.length))()];
              return (
                <div key={i} className={cx('popular-card')}>
                  <div
                    className={cx('popular-card-image')}
                    style={{background: `url(${x.image})`}}></div>
                  <div
                    className={cx('popular-card-content')}
                    style={{background}}>
                    <div>{x.exchange}</div>
                    <div>Từ: {x.price}đ</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});

const Advertisement = React.memo(() => {
  return (
    <div>
      <div className="flex space-between mb-4">
        <div className="text-heading">Nền tảng đặt vé trực tuyến</div>
      </div>
      <div className={cx('advertising-section')}>
        {mockup.advertisements.map((x, i) => {
          return (
            <div key={i} className={cx('advertising')}>
              <div className={cx('advertising-icon')}>
                <img src={x.image} alt="" />
              </div>
              <div className={cx('advertising-post')}>
                <div className="text-title">{x.title}</div>
                <div className="text-small text-muted">{x.content}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
export default Home;
