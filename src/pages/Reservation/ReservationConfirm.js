import {MdOutlineIosShare} from 'react-icons/md';
import moment from 'moment';
import {useNavigate, useParams} from 'react-router-dom';
import bookingApi from '~/apis/booking.api';
import {useDispatch, useSelector} from 'react-redux';
import {useToast} from '~/components';
import {resetChosen} from '~/redux/reservationSlice';

const bar = Array(1000)
  .fill(0)
  .map(x => (Math.round(Math.random()) === 0 ? 'white' : 'grey'));

const ReservationConfirm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const reservation = useSelector(state => state.reservation);
  const toast = useToast();
  const ticket = {
    departure: 'Hà Nôi',
    arrival: 'Cao Bằng',
    date: '2022-11-11',
    start: '07:00:00'
  };

  const handleSubmit = () => {
    const {chosen} = reservation;
    const {scheduleId, date} = params;

    const reservationRequest = async data => {
      const response = await bookingApi.create({
        chosen: {
          scheduleId,
          date,
          seatIds: chosen.seats
        },
        contact: {
          passenger: 'Ngô Đăng Khôi',
          phoneNumber: '0961159460',
          email: 'jinseimelody@gmail.com',
          note: 'Gọi số phụ khi không liên lạc được 0778985271(Móm)'
        }
      });

      const {status, error} = response;
      const responseHandler = {
        410: () => {
          toast.show(error.message, () => {
            dispatch(resetChosen());
            navigate(`/reservation/1/${params.scheduleId}/${params.date}`);
          });
        },
        404: () => toast.show(error.message),
        undefined: () => {
          const {ticketId, sessionId} = response;
          navigate(`/reservation/4/${ticketId}/${sessionId}`);
        }
      }[status];
      responseHandler();
    };

    reservationRequest();
  };

  return (
    <>
      <div className="flex flex-start flex-nowrap space-between mb-4">
        <div className="text-hero animate__animated animate__fadeInLeft">
          Just one more step
        </div>
        <div className="avatar"></div>
      </div>
      <div className="flex space-between">
        <div className="text-title mb-3">Passenger</div>
        <div className="text-link" onClick={() => navigate(-1)}>
          Change
        </div>
      </div>
      <div className="card mb-3">
        <div className="flex space-between">
          <div className="text-muted">Name</div>
          <div>Ngô Đăng Khôi</div>
        </div>
        <div className="flex space-between">
          <div className="text-muted">Phone number</div>
          <div>
            <span className="text-bold">+84</span> 961159460
          </div>
        </div>
        <div className="flex space-between">
          <div className="text-muted">Email</div>
          <div>jinseimelody@gmail.com</div>
        </div>
      </div>
      <div className="mb-3">
        <div className="text-title">Note</div>
        <div className="text-muted">
          Nếu không gọi được hãy gọi số 0778985271
        </div>
      </div>
      <div className="v-ticket mb-3">
        <div className="top">
          <div className="flex space-between mb-3">
            <MdOutlineIosShare />
          </div>
          <div className="mb-4">
            <div className="text-title">
              {ticket.departure} - {ticket.arrival}
            </div>
            <div className="text-muted">Show this ticket at the entrance</div>
          </div>
          <div className="flex">
            <div className="w-50 mb-3">
              <div className="text-muted">Date</div>
              <div>{moment(ticket.date).format('dddd, MM/DD, yyyy')}</div>
            </div>
            <div className="w-50 mb-3">
              <div className="text-muted">Time</div>
              <div>{moment(ticket.start, 'hh:mm:ss').format('hh:mm A')}</div>
            </div>
          </div>
          <div className="flex ">
            <div className="w-50 mb-3">
              <div className="text-muted">Bus</div>
              <div>25-145.32</div>
            </div>
            <div className="w-50 mb-3">
              <div className="text-muted">Seats</div>
              <div>B03, B04, B05</div>
            </div>
          </div>
          <div className="flex">
            <div className="w-50 mb-3">
              <div className="text-muted">Cost</div>
              <div>1,050,000đ</div>
            </div>
            <div className="w-50 mb-3">
              <div className="text-muted">Order</div>
              <div className="text-ellipsis">2151-21653-2154</div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="barcode">
            {bar.map((x, i) => (
              <div key={i} style={{background: x}}></div>
            ))}
          </div>
        </div>
      </div>

      <button className="btn-submit" onClick={handleSubmit}>
        Continue
      </button>
    </>
  );
};

export default ReservationConfirm;
