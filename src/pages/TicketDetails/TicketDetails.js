import moment from 'moment';
import {useEffect, useState} from 'react';
import {MdOutlineIosShare} from 'react-icons/md';
import {useParams} from 'react-router-dom';
import ticketApi from '~/apis/ticket.api';

const bar = Array(1000)
  .fill(0)
  .map(x => (Math.round(Math.random()) === 0 ? 'white' : 'grey'));

const TicketDetails = () => {
  const params = useParams();
  const [ticket, setTicket] = useState();

  useEffect(() => {
    const abortController = new AbortController();
    const getTicketDetails = async () => {
      const {ticketId} = params;
      setTicket(await ticketApi.getOne(ticketId));
    };
    getTicketDetails();
    return () => abortController.abort;
  }, []);

  return (
    <>
      <div className="v-ticket">
        <div className="top">
          <div className="flex space-between mb-3">
            <button
              style={{
                background: '#ff8f60',
                color: '#ffffff'
              }}>
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
            <div className="text-hero">
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
    </>
  );
};

export default TicketDetails;
