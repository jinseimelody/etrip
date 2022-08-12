import {IoIosArrowForward, IoIosMenu} from 'react-icons/io';
import {Link} from 'react-router-dom';
import './default.scss';

const Footer = () => {
  const members = [
    {
      image:
        'https://scontent.fsgn5-11.fna.fbcdn.net/v/t39.30808-6/272690965_949998859243804_6052759687933835875_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=hS3cnqbKnbIAX_E7Z7B&_nc_ht=scontent.fsgn5-11.fna&oh=00_AT8PcXT4oz1UncnVRgbRBHhbHUpH7FhEkotYRgz4fcH9hg&oe=62F9DA9E',
      name: 'Đăng Khoi',
      position: 'Junior FS'
    },
    {
      image:
        'https://scontent.fsgn5-12.fna.fbcdn.net/v/t39.30808-6/293720998_1739976213033671_8652009867497365062_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=yd6uQFBYgcEAX-BCq4J&_nc_ht=scontent.fsgn5-12.fna&oh=00_AT9hH-jrw7cFaJ7Nb6Tg1ajqdt8L5HfjxVz1TEhp9krCXg&oe=62FAA120',
      name: 'Huy Tran',
      position: 'Angular expert'
    },
    {
      image:
        'https://scontent.fsgn5-11.fna.fbcdn.net/v/t39.30808-6/276065699_3243466155887978_5941592453524196647_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=9Y4ATV5XCH0AX8lOfWQ&_nc_ht=scontent.fsgn5-11.fna&oh=00_AT__Bk_c6GxNzly1o4QYWAb1rB3pfAcWgQFwU4ANwNP5ow&oe=62FA5E29',
      name: 'Lê Quang Hiếu',
      position: 'Junior FS'
    },
    {
      image:
        'https://scontent.xx.fbcdn.net/v/t1.15752-9/290687934_1503671440117527_5479110940819627550_n.png?stp=dst-png_p206x206&_nc_cat=111&ccb=1-7&_nc_sid=aee45a&_nc_ohc=bUcRvCw_Y3MAX9JHNIz&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVLHAGxbpLLu2V5oUQ4MguJ8-09hy5Z-IuBi0KZhG3NEYQ&oe=6319AA0C',
      name: 'Nguyễn Khải',
      position: 'Senior BE'
    }
  ];

  return (
    <footer>
      <div className="flex flex-nowrap flex-start">
        <div className="general">
          <div className="organization-logo mb-3">
            <div>
              <span
                style={{
                  fontWeight: 700,
                  padding: '2px'
                }}>
                Git
              </span>
              <span
                style={{
                  background: '#f79a20',
                  borderRadius: '5px',
                  fontWeight: 700,
                  color: '#000',
                  padding: '2px'
                }}>
                Hub
              </span>
            </div>
            <div
              style={{
                marginTop: '2px',
                fontSize: '8px',
                fontWeight: 700
              }}>
              THE PLACE WHERE I FORK
            </div>
          </div>
          <div className="text-title">The Coding Gangz</div>
          <div className="text-small text-muted">August, 2015</div>
        </div>
        <div className="contact-me">
          <div className="text-title mb-3">Developer team</div>
          {members.map((x, i) => {
            return (
              <div key={i} className="contact-card">
                <div
                  className="contact-card-image"
                  style={{
                    background: `url(${x.image})`
                  }}></div>
                <div className="contact-card-content">
                  <div>{x.name}</div>
                  <div className="text-small text-muted">{x.position}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

const Default = ({children}) => {
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
      {children}
      <Footer />
    </div>
  );
};

export default Default;
