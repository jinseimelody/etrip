import {IoIosArrowForward, IoIosMenu} from 'react-icons/io';
import {Link} from 'react-router-dom';
import image from '~/assets';
import './home.scss';

const Home = () => {
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
    <div className="backdrop">
      <header className="flex space-between">
        <div className="flex">
          <IoIosMenu className="text-heading mr-3" />
          <div className="text-heading">
            <span>Coetoris</span>
            <span className="text-danger">E</span>
          </div>
        </div>
        <Link to="/" className="flex text-title">
          Chào <IoIosArrowForward />
        </Link>
      </header>
      <div className="container">
        <div className="flex flex-start flex-nowrap space-between mb-4">
          <div className="text-hero">Where do you want to go ?</div>
          <div className="avatar"></div>
        </div>

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
              <div className="from-select">
                <span className="text-small text-muted mb-1">Nơi xuất phát</span>
                <input type="text" placeholder="Hà Nội" />
              </div>
              <div className="rip"></div>
              <div className="to-select">
                <span className="text-small text-muted mb-1">Nơi đến</span>
                <input type="text" placeholder="Cao Bằng"></input>
              </div>
            </div>
            <button className="btn-exchange">
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
              <div className="date-select">
                <label className="text-small text-muted">Departure Date</label>
                <input readOnly type="text" placeholder="Sat, 23/07, 22"></input>
              </div>
            </div>
          </div>
        </div>

        <div>
          <button className="btn-submit">Continue</button>
        </div>

        <div>
          <div className="flex space-between mt-5">
            <div className="text-heading">Tìm kiếm gần đây</div>
            <div>Xóa tất cả</div>
          </div>

          <div className="recent-search-section">
            <div className="scroll-y-container">
              <div className="scroll-content">
                <div className="recent-card">
                  <div>
                    <div className="flex text-bold">
                      <div className="icon icon-sm mr-2">
                        <img src={image.circleMarker} alt="" />
                      </div>
                      <div className="recent-from">Sài Gòn</div>
                    </div>
                    <div className="flex text-bold">
                      <div className="icon icon-sm mr-2">
                        <img src={image.circleMarkerEnd} alt="" />
                      </div>
                      <div className="recent-to">Bx. Trung tâm Tp.Cần Thơ</div>
                    </div>
                    <div className="recent-date text-small text-muted">Thứ sáu, 12/8/2022</div>
                  </div>
                  <div>
                    <IoIosArrowForward />
                  </div>
                </div>
                <div className="recent-card">
                  <div>
                    <div className="flex text-bold">
                      <div className="icon icon-sm mr-2">
                        <img src={image.circleMarker} alt="" />
                      </div>
                      <div className="recent-from">Sài Gòn</div>
                    </div>
                    <div className="flex text-bold">
                      <div className="icon icon-sm mr-2">
                        <img src={image.circleMarkerEnd} alt="" />
                      </div>
                      <div className="recent-to">Bx. Trung tâm Tp.Cần Thơ</div>
                    </div>
                    <div className="recent-date text-small text-muted">Thứ sáu, 12/8/2022</div>
                  </div>
                  <div>
                    <IoIosArrowForward />
                  </div>
                </div>
                <div className="recent-card">
                  <div>
                    <div className="flex text-bold">
                      <div className="icon icon-sm mr-2">
                        <img src={image.circleMarker} alt="" />
                      </div>
                      <div className="recent-from">Sài Gòn</div>
                    </div>
                    <div className="flex text-bold">
                      <div className="icon icon-sm mr-2">
                        <img src={image.circleMarkerEnd} alt="" />
                      </div>
                      <div className="recent-to">Bx. Trung tâm Tp.Cần Thơ</div>
                    </div>
                    <div className="recent-date text-small text-muted">Thứ sáu, 12/8/2022</div>
                  </div>
                  <div>
                    <IoIosArrowForward />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex space-between">
            <div className="text-heading">Tuyến đường phổ biến</div>
          </div>

          <div className="popular-section">
            <div className="scroll-y-container">
              <div className="scroll-content">
                {populars.map((x, i) => {
                  const background = palette[(() => Math.floor(Math.random() * palette.length))()];
                  console.log(background);
                  return (
                    <div key={i} className="popular-card">
                      <div
                        className="popular-card-image"
                        style={{background: `url(${x.image})`}}></div>
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
      </div>
    </div>
  );
};
export default Home;
