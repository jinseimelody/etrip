import moment from 'moment';
import {useEffect, useRef, useState} from 'react';
import {MdOutlineIosShare} from 'react-icons/md';
import {useParams} from 'react-router-dom';
import {IoIosAddCircleOutline} from 'react-icons/io';
import {GoKebabHorizontal} from 'react-icons/go';
import {RiVisaLine, RiMastercardLine} from 'react-icons/ri';

import image from '~/assets';
import {Modal} from '~/components';
import ticketApi from '~/apis/ticket.api';

const bar = Array(1000)
  .fill(0)
  .map(x => (Math.round(Math.random()) === 0 ? 'white' : 'grey'));

const TicketDetails = () => {
  const params = useParams();
  const [ticket, setTicket] = useState();
  const [paymentPopup, setPaymentPopup] = useState({
    mode: 'view'
  });
  const paymentPopupRef = useRef();

  useEffect(() => {
    const abortController = new AbortController();
    const getTicketDetails = async () => {
      const {ticketId} = params;
      setTicket(await ticketApi.getOne(ticketId));
    };
    getTicketDetails();
    return () => abortController.abort;
  }, []);

  const paymentMethods = (
    <>
      <Modal ref={paymentPopupRef} cancel="Cancel" title="Payment method">
        {
          {
            view: (
              <>
                <div className="flex flex-start space-between mb-3">
                  <div>
                    <span className="text-heading">Subscriptions</span>
                    <br />
                    <span className="text-muted">
                      Earned points are received upon payment successful
                    </span>
                  </div>
                </div>
                <div>
                  <div className="card card-selected mb-3">
                    <div className="flex">
                      <div className="payment-method-logo mr-3">
                        <div className="flex" style={{width: '2.5rem'}}>
                          <img alt="" src={image.coetorise} />
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <span>Coetorise xxxx9460</span>
                        <br />
                        <span className="text-muted">1000 point</span>
                      </div>
                      <div>
                        <GoKebabHorizontal />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-start space-between mb-3">
                  <div>
                    <span className="text-heading">Saved cards</span>
                    <br />
                    <span className="text-muted">
                      List of all credit cards you saved
                    </span>
                  </div>
                  <div className="text-link mt-3">Add</div>
                </div>
                <div>
                  <div className="card mb-3">
                    <div className="flex">
                      <div className="payment-method-logo mr-3">
                        <RiVisaLine style={{fontSize: '3.5rem'}} />
                      </div>
                      <div className="flex-grow-1">
                        <span>Visa xxxx1657</span>
                        <br />
                        <span className="text-muted">Expires on 16/24</span>
                      </div>
                      <div>
                        <GoKebabHorizontal />
                      </div>
                    </div>
                  </div>
                  <div className="card mb-3">
                    <div className="flex">
                      <div className="payment-method-logo mr-3">
                        <RiMastercardLine style={{fontSize: '2.5rem'}} />
                      </div>
                      <div className="flex-grow-1">
                        <span>Mastercard xxxx9878</span>
                        <br />
                        <span className="text-muted">Expires on 20/28</span>
                      </div>
                      <div>
                        <GoKebabHorizontal />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ),
            add: <div>Hello dude</div>
          }[paymentPopup.mode]
        }
      </Modal>
    </>
  );

  return (
    <>
      {paymentMethods}
      {ticket && (
        <div className="v-ticket">
          <div className="top">
            <div className="flex space-between mb-3">
              <button
                onClick={() => paymentPopupRef.current.show()}
                className="btn-orange">
                Pay Now
              </button>
              <MdOutlineIosShare />
            </div>
            <div>
              <span className="text-small text-danger">
                <div>
                  Your reservation request gonna be canceled at{' '}
                  {moment().add(5, 'minute').format('MM/DD, yyyy hh:mm')}
                </div>
                <div>Please paid before this time</div>
              </span>
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
      )}
    </>
  );
};

export default TicketDetails;
