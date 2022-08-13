import moment from 'moment';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {IoIosArrowForward, IoIosMenu} from 'react-icons/io';
import {Link, useNavigate} from 'react-router-dom';
import {storage} from '~/api';
import image from '~/assets';
import {Calendar, Modal} from '~/components';
import {useToast} from '~/components/Toast';
import {EndpointPopup} from '../shared';
import './home.scss';

const Home = () => {
  return (
    <div className="container">
      <div className="flex flex-start flex-nowrap space-between mb-4">
        <div className="text-hero animate__animated animate__fadeInLeft">
          Where do you want to go ?
        </div>
        <div className="avatar"></div>
      </div>

      <SearchWidget />

      <RecentSearch />

      <Popular />

      <Advertisement />
    </div>
  );
};

const Advertisement = () => {
  return (
    <div>
      <div className="flex space-between mb-4">
        <div className="text-heading">Nền tảng đặt vé trực tuyến</div>
      </div>
      <div className="advertising-section">
        <div className="advertising">
          <div className="advertising-icon">
            <img
              src="	https://storage.googleapis.com/fe-production/svgIcon/bus-car-icon.svg"
              alt=""
            />
          </div>
          <div className="advertising-post">
            <div className="text-title">Nhà xe chất lượng cao</div>
            <div className="text-small text-muted">
              +1000 tuyến đường trên toàn quốc, chủ động và đa dạng lựa chọn.
            </div>
          </div>
        </div>
        <div className="advertising">
          <div className="advertising-icon">
            <img
              src="https://storage.googleapis.com/fe-production/svgIcon/yellow-ticket-icon.svg"
              alt=""
            />
          </div>
          <div className="advertising-post">
            <div className="text-title">Đặt vé dễ dàng</div>
            <div className="text-small text-muted">
              Đặt vé chỉ với 60s. Chọn chuyến đi yêu thích cực nhanh và thuận tiện.
            </div>
          </div>
        </div>

        <div className="advertising">
          <div className="advertising-icon">
            <img
              src="https://storage.googleapis.com/fe-production/svgIcon/completement-icon.svg"
              alt=""
            />
          </div>
          <div className="advertising-post">
            <div className="text-title">Đảm bảo có vé</div>
            <div className="text-small text-muted">
              Hoàn ngay 150% nếu không có vé, mang đến hành trình trọn vẹn.
            </div>
          </div>
        </div>
        <div className="advertising">
          <div className="advertising-icon">
            <img
              src="	https://storage.googleapis.com/fe-production/svgIcon/coupon-icon.svg"
              alt=""
            />
          </div>
          <div className="advertising-post">
            <div className="text-title">Nhiều ưu đãi</div>
            <div className="text-small text-muted">Hàng nghìn ưu đã độc quyền tại Etrip.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Popular = () => {
  const palette = ['#e3b597', '#7e3a3d', '#d05a42', '#2f2936', '#0d0d12'];
  const populars = [
    {
      image:
        'https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2018/01/kinh-nghiem-du-lich-da-lat-ban-can-luu-lai-1.png',
      exchange: 'Sài Gòn - Đà Lạt',
      price: '200.000'
    },
    {
      image: 'https://vietnaminsider.vn/wp-content/uploads/2022/03/e5.jpg',
      exchange: 'Sài Gòn - Nha Trang',
      price: '231.000'
    },
    {
      image: 'https://file4.batdongsan.com.vn/2021/04/12/JGcIp0rf/20210412103314-6083.jpg',
      exchange: 'Sài Gòn - Phan Thiết',
      price: '170.000'
    }
  ];
  return (
    <div>
      <div className="flex space-between">
        <div className="text-heading">Tuyến đường phổ biến</div>
      </div>

      <div className="popular-section">
        <div className="scroll-y-container">
          <div className="scroll-content">
            {populars.map((x, i) => {
              const background = palette[(() => Math.floor(Math.random() * palette.length))()];
              return (
                <div key={i} className="popular-card">
                  <div className="popular-card-image" style={{background: `url(${x.image})`}}></div>
                  <div className="popular-card-content" style={{background}}>
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
};

const RecentSearch = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(() => {
    const searches = storage.get('recentSearches');
    if (!searches || !Array.isArray(searches)) return {searches: []};

    return {searches: searches.reverse()};
  });

  const {searches} = state;

  const handleClear = () => {
    setState({searches: []});
    localStorage.removeItem('recentSearches');
  };

  const handleSearch = search => {
    const {departure, arrival, date} = search;
    navigate(`/search/${departure.id}/${arrival.id}/${date.format('yyyy-MM-DD')}`);
  };

  return (
    searches.length > 0 && (
      <div>
        <div className="flex space-between mt-5">
          <div className="text-heading">Tìm kiếm gần đây</div>
          <div className="text-link" onClick={handleClear}>
            Xóa tất cả
          </div>
        </div>

        <div className="recent-search-section">
          <div className="scroll-y-container">
            <div className="scroll-content">
              {searches.map((search, i) => {
                return (
                  <div key={i} className="recent-card" onClick={() => handleSearch(search)}>
                    <div>
                      <div className="flex text-bold">
                        <div className="icon icon-sm mr-2">
                          <img src={image.circleMarker} alt="" />
                        </div>
                        <div className="recent-from">{search.departure.name}</div>
                      </div>
                      <div className="flex text-bold">
                        <div className="icon icon-sm mr-2">
                          <img src={image.circleMarkerEnd} alt="" />
                        </div>
                        <div className="recent-to">{search.arrival.name}</div>
                      </div>
                      <div className="recent-date text-small text-muted">
                        {search.date.format('dddd, DD/MM, yy')}
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
    )
  );
};

const SearchWidget = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(() => {
    const searches = storage.get('recentSearches');
    if (!searches || !Array.isArray(searches)) return {};

    return {...searches[searches.length - 1]};
  });
  const {arrival, departure, date} = state;

  const toast = useToast();

  const depaturePopupRef = useRef();
  const arrivalPopupRef = useRef();
  const datePopupRef = useRef();
  const calendarRef = useRef();

  const onSubmit = () => {
    if (date && departure.id && arrival.id) {
      const from = state.departure.id;
      const to = state.arrival.id;
      const date = state.date.format('yyyy-MM-DD');

      let searches = storage.get('recentSearches');
      if (!searches || !Array.isArray(searches)) searches = [];

      // make sure history did not exist
      const existed = searches.filter(x => {
        return x.departure.id === from && x.arrival.id === to && x.date.isSame(state.date, 'day');
      });
      if (existed.length === 0) searches.push(state);

      storage.set('recentSearches', searches);
      navigate(`/search/${from}/${to}/${date}`);
      return;
    }
    toast.error('Please fill in all the required fields');
  };

  return (
    <>
      <EndpointPopup
        ref={depaturePopupRef}
        modal={{cancel: 'Hủy', title: 'Điểm đi'}}
        onSelect={val => {
          setState({...state, departure: val});
        }}
      />

      <EndpointPopup
        ref={arrivalPopupRef}
        modal={{cancel: 'Hủy', title: 'Điểm đến'}}
        onSelect={val => setState({...state, arrival: val})}
      />

      <Modal
        ref={datePopupRef}
        onConfirm={() => setState({...state, date: calendarRef.current.getValue()})}
        cancel="Cancel"
        confirm="Select"
        title="Depature Date">
        <Calendar
          ref={calendarRef}
          initValue={state.date}
          options={{mode: 'month', preview: true}}
        />
      </Modal>
      <div className="search-widget">
        <div className="route-section">
          <div className="icon-container">
            <div className="icon">
              <img src={image.circleMarker} alt="" />
            </div>
            <div className="line"></div>
            <div className="icon">
              <img src={image.circleMarkerEnd} alt="" />
            </div>
          </div>
          <div className="route-selection-container">
            <div
              className="from-select"
              onClick={() => {
                departure && depaturePopupRef.current.setSearch(departure.name);
                depaturePopupRef.current.show();
              }}>
              <span className="text-small text-muted mb-1">Nơi xuất phát</span>
              <input
                type="text"
                placeholder="Hà Nội"
                readOnly
                value={departure && departure.name}
              />
            </div>
            <div className="rip"></div>
            <div
              className="to-select"
              onClick={() => {
                arrival && arrivalPopupRef.current.setSearch(arrival.name);
                arrivalPopupRef.current.show();
              }}>
              <span className="text-small text-muted mb-1">Nơi đến</span>
              <input
                type="text"
                placeholder="Cao Bằng"
                readOnly
                value={arrival && arrival.name}></input>
            </div>
          </div>
          <button
            className="btn-exchange"
            onClick={() => setState({...state, departure: arrival, arrival: departure})}>
            <img src={image.vExchange} alt="" />
          </button>
        </div>
        <div className="rip" style={{marginLeft: '1.75rem'}}></div>
        <div className="date-section">
          <div className="icon-container">
            <div className="icon">
              <img src={image.calendar} alt=""></img>
            </div>
          </div>
          <div className="route-selection-container">
            <div className="date-select" onClick={_ => datePopupRef.current.show()}>
              <label className="text-small text-muted mb-1">Departure Date</label>
              <input
                readOnly
                type="text"
                placeholder="Sat, 23/07, 22"
                defaultValue={date && date.format('ddd, DD/MM, YY')}></input>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-5">
        <button className="btn-submit" onClick={() => onSubmit(state)}>
          Continue
        </button>
      </div>
    </>
  );
};

export default Home;
