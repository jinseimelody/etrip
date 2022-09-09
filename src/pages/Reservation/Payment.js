import {useRef} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {paymentApi} from '~/apis';
import {useLoading, useToast} from '~/components';
import {TYPE} from '~/components/Toast';
import pipe from '~/helper';
import {PaymentWidget} from '../Shared';

const Payment = () => {
  const navigate = useNavigate();
  const {ticketId, sessionId} = useParams();
  const loading = useLoading();
  const reservation = useSelector(state => state.reservation);
  const toast = useToast();
  const paymentMethodRef = useRef();

  const {
    bus: {price},
    chosen: {seats, total}
  } = reservation;

  const sendPaymentRequest = async () => {
    loading.show();
    const {id} = paymentMethodRef.current.getValue();
    const response = await paymentApi.pay({
      paymentMethod: id,
      ticketId: ticketId,
      sessionId: sessionId
    });

    loading.hide();
    const {status, error} = response;
    if (status === 200) return navigate('/', {replace: true});

    toast.show(error?.message);
  };

  const handleSubmit = () => {
    const paymentMethod = paymentMethodRef.current.getValue();
    if (!paymentMethod) {
      toast.show('Please select a payment method');
      return;
    }
    const {id, name} = paymentMethod;
    const handlePayment = {
      1: () =>
        toast.show(`Pay using ${name}`, {
          type: TYPE.CONFIRM,
          onConfirm: sendPaymentRequest
        }),
      undefined: () =>
        toast.show(
          'Selected method temporary not supported, feature coming soon'
        )
    }[id];

    handlePayment();
  };

  return (
    <>
      <div className="text-heading mb-3">Total payment</div>
      <div className="flex flex-start space-between mb-3">
        <div>Ticket price</div>
        <div className="text-right">
          <div>
            {pipe.currency(price)}đ x {seats?.length}
          </div>
          <span className="text-muted">Code seat/bed: {seats?.join(', ')}</span>
        </div>
      </div>
      <div className="flex space-between mb-3">
        <div>Total</div>
        <div>{pipe.currency(total)}đ</div>
      </div>
      <div className="text-heading mb-3">Payment method</div>
      <PaymentWidget ref={paymentMethodRef} />
      <button className="btn-submit" onClick={handleSubmit}>
        Pay now
      </button>
    </>
  );
};

export default Payment;
