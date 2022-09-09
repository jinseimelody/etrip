import classNames from 'classnames/bind';
import style from './fake.barcode.scss';
const cx = classNames.bind(style);

const bar = Array(1000)
  .fill(0)
  .map(x => (Math.round(Math.random()) === 0 ? 'white' : 'grey'));

const FakeBarCode = () => {
  return (
    <div className={cx('barcode')}>
      {bar.map((x, i) => (
        <div key={i} style={{background: x}}></div>
      ))}
    </div>
  );
};

export default FakeBarCode;
