import {useRef} from 'react';
import {IoMdReturnLeft} from 'react-icons/io';
import {useParams} from 'react-router-dom';
import {useToast} from '~/components';
import {PaymentWidget} from '../Shared';

const Payment = data => {
  const {ticketId, sessionId} = useParams();
  const toast = useToast();
  const paymentMethodRef = useRef();

  const handleSubmit = () => {
    const paymentMethod = paymentMethodRef.current.getValue();
    if (!paymentMethod) {
      toast.show('Please select a payment method');
      return;
    }
    const {id, name} = paymentMethod;
    const handlePayment = {
      1: () => toast.show(`Pay using ${name}`),
      2: () =>
        toast.show(
          'Selected method temporary not supported, feature coming soon'
        ),
      3: () =>
        toast.show(
          'Selected method temporary not supported, feature coming soon'
        ),
      undefined: () => toast.error('Payment method not found')
    }[id];

    handlePayment();
  };

  return (
    <>
      <div className="text-heading mb-3">Total payment</div>
      <div className="flex flex-start space-between mb-3">
        <div>Giá vé</div>
        <div className="text-right">
          <div>200,000đ x 2</div>
          <span className="text-muted">Mã ghế/giường: A01, B03</span>
        </div>
      </div>
      <div className="flex space-between mb-3">
        <div>Tổng tiền</div>
        <div>400,000</div>
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
