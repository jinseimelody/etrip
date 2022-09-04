/* eslint-disable react-hooks/exhaustive-deps */
import moment from 'moment';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import ticketApi from '~/apis/ticket.api';

import pipe from '~/helper';

const counter = 5 * 60;
const BookingHistory = () => {
  const navigate = useNavigate();
  const [tickets, setHistory] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const getBookingHistory = async () => {
      setHistory(await ticketApi.search());
    };
    getBookingHistory();

    return () => abortController.abort();
  }, []);

  console.log(tickets);

  const elements = tickets.map((ticket, i) => {
    const background = ['CANCELED', 'WAITING'].includes(ticket.status)
      ? 'oldlace'
      : 'white';

    return (
      <div
        key={i}
        className="ticket cursor-pointer"
        style={{background}}
        onClick={() => navigate(`/tickets/${ticket.id}`)}>
        <div className="general">
          <div className="text-title">
            {ticket.departure} - {ticket.arrival}
          </div>
          <div className="text-muted">
            {moment(ticket.date).format('dddd, MM/DD, yyyy')}
          </div>
        </div>
        <div className="specific">
          <div>
            <span className="text-muted">Price: </span>
            <span className="text-title">{pipe.currency(ticket.total)}</span>đ
          </div>
          {
            {
              paid: <div className="text-right text-muted">+16 point</div>,
              waiting: (
                <div className="text-right text-small text-danger">
                  Pay now: {pipe.duration(counter, 'ms')}
                </div>
              ),
              canceled: (
                <div className="text-right text-small text-danger">Expired</div>
              )
            }[ticket.status.toLowerCase()]
          }
        </div>
      </div>
    );
  });

  return (
    <>
      <div>
        <div className="text-center text-muted">Wallet total</div>
        <div className="text-center">
          <span className="text-hero">430.82</span>đ
        </div>
      </div>

      <div className="flex space-between mb-3">
        <div className="text-heading">Recently</div>
        <div className="text-link cursor-pointer">See all</div>
      </div>
      <div>{elements}</div>
    </>
  );
};

export default BookingHistory;
