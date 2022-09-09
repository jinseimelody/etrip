import moment from 'moment';
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {MdOutlineIosShare} from 'react-icons/md';

import bookingApi from '~/apis/booking.api';
import {FakeBarCode, useToast} from '~/components';
import {resetChosen} from '~/redux/reservationSlice';
import pipe from '~/helper';
import {push} from '~/redux/paymentSlice';
import {TYPE} from '~/components/Toast';

const ReservationConfirm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const reservation = useSelector(state => state.reservation);
  const toast = useToast();

  const {
    // eslint-disable-next-line no-unused-vars
    trip: {scheduleId, start, end, date, from, to, price},
    bus: {busId},
    chosen: {seats, total},
    contact: {passenger, phoneNumber, email, note}
  } = reservation;

  const handleSubmit = () => {
    const {chosen} = reservation;
    const reservationRequest = async data => {
      const response = await bookingApi.create({
        chosen: {
          scheduleId,
          date,
          seatIds: chosen.seats
        },
        contact: {passenger, phoneNumber, email, note}
      });

      const {status, error} = response;
      console.log(response);
      const responseHandler = {
        410: () => {
          toast.show(error.message, {
            type: TYPE.ERROR,
            onClose: () => {
              dispatch(resetChosen());
              navigate(`/reservation/1/${params.scheduleId}/${params.date}`);
            }
          });
        },
        404: () => toast.show(error.message),
        undefined: () => {
          const {ticketId, sessionId} = response;
          dispatch(push({ticketId, sessionId}));
          navigate(`/reservation/4/${sessionId}/${ticketId}`, {replace: true});
        }
      }[status];

      typeof responseHandler === 'function' && responseHandler();
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
        <div className="text-heading mb-3">Passenger</div>
        <div
          className="text-link"
          onClick={() => navigate(-1, {replace: true})}>
          Change
        </div>
      </div>
      <div className="card mb-3">
        {passenger && (
          <div className="flex space-between">
            <div className="text-muted">Name</div>
            <div>{passenger}</div>
          </div>
        )}
        {phoneNumber && (
          <div className="flex space-between">
            <div className="text-muted">Phone number</div>
            <div>
              <span className="text-bold">+84</span> {phoneNumber}
            </div>
          </div>
        )}

        {email && (
          <div className="flex space-between">
            <div className="text-muted">Email</div>
            <div>{email}</div>
          </div>
        )}
      </div>
      {note && (
        <div className="mb-3">
          <div className="text-heading">Note</div>
          <div className="text-muted">{note}</div>
        </div>
      )}

      <div className="v-ticket mb-3">
        <div className="top">
          <div className="mb-4">
            <div className="flex text-title">
              {from} - {to}
              <MdOutlineIosShare className="ml-auto" />
            </div>
            <div className="text-muted">Show this ticket at the entrance</div>
          </div>
          <div className="flex">
            <div className="w-50 mb-3">
              <div className="text-muted">Date</div>
              <div>{moment(date).format('dddd, MM/DD, yyyy')}</div>
            </div>
            <div className="w-50 mb-3">
              <div className="text-muted">Time</div>
              <div>{moment(start, 'hh:mm:ss').format('hh:mm A')}</div>
            </div>
          </div>
          <div className="flex ">
            <div className="w-50 mb-3">
              <div className="text-muted">Bus</div>
              <div>{busId}</div>
            </div>
            <div className="w-50 mb-3">
              <div className="text-muted">Seats</div>
              <div>{seats?.join(', ')}</div>
            </div>
          </div>
          <div className="flex">
            <div className="w-50 mb-3">
              <div className="text-muted">Cost</div>
              <div>{pipe.currency(total)}đ</div>
            </div>
            <div className="w-50 mb-3">
              <div className="text-muted">Order</div>
              <div className="text-ellipsis">2151-21653-2154</div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <FakeBarCode />
        </div>
      </div>

      <button className="btn-submit" onClick={handleSubmit}>
        Continue
      </button>
    </>
  );
};

export default ReservationConfirm;
