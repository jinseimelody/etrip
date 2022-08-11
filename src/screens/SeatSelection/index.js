import {useEffect, useReducer} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {IoIosArrowBack} from 'react-icons/io';
import classNames from 'classnames/bind';
import styles from './seat.selection.module.scss';

import {Card} from '~/components';
import {tripApi, bookingApi} from '~/api';
import {pipe, buslayout} from '~/helper';
import reducer, {iniState} from './reducer';
import {setChosen, setState, setTab} from './actions';
import {useToast} from '~/components/Toast';

const cx = classNames.bind(styles);

const SeatSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const toast = useToast();

  const [state, dispatch] = useReducer(reducer, iniState);

  useEffect(() => {
    tripApi.getOne({...params}).then(data => {
      const {seats, ...general} = data;

      buslayout.validate(general.layoutId);
      const layout = buslayout[general.layoutId].init(seats);

      dispatch(setState({...state, general, layout}));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelection = seat => {
    if (!seat.avaliable) return;

    // allow maximum 3 seat chosen
    const seats = new Set(state.chosen.seats);
    if (!seats.has(seat.seatId) && seats.size === 3) {
      const msg =
        "You have reached the maximum number of seats purchased for this route. Can't choose more seats";
      toast.error(msg);
      return;
    }

    // update seat status
    if (seats.has(seat.seatId)) {
      seats.delete(seat.seatId);
    } else {
      seats.add(seat.seatId);
    }

    // re-calc total
    const total = seats.size * Number(state.general.price);
    dispatch(setChosen({total, seats}));
  };

  const handleSubmit = _ => {
    const seats = [...state.chosen.seats];
    if (seats.length === 0) {
      toast.show('Please choose a seats');
      return;
    }

    bookingApi
      .create({scheduleId: state.general.scheduleId, date: state.general.date, seatIds: seats})
      .then(res => {
        if (res.error && res.status === 401) {
          navigate('/login', {state});
          return;
        }

        toast.show('Reservation successfully');
      });
  };

  console.log(location.state);
  return (
    <>
      <div className="header">
        <div className="action action-left">
          <div onClick={() => navigate(-1)}>
            <IoIosArrowBack />
          </div>
        </div>
        <div className="text-title">Seat selection</div>
      </div>
      <div className="container">
        <div className={cx('limousine')}>
          <div className={cx('nav')}>
            <div
              onClick={() => dispatch(setTab('ground'))}
              className={cx(['nav-item', {active: state.view === 'ground'}])}>
              On Ground
            </div>
            <div
              onClick={() => dispatch(setTab('upstairs'))}
              className={cx(['nav-item', {active: state.view === 'upstairs'}])}>
              Upstairs
            </div>
          </div>
          <div className={cx('bus')}>
            {state.layout[state.view] &&
              state.layout[state.view].map((row, i) => {
                return (
                  <div
                    key={i}
                    className={i === 0 ? 'flex space-between' : 'flex space-between mt-4'}>
                    {row.map((seat, j) => (
                      <div
                        key={j}
                        onClick={() => handleSelection(seat)}
                        className={cx([
                          'seat',
                          {'seat-unavaliable': !seat.avaliable},
                          {
                            'seat-avaliable': !state.chosen.seats.has(seat.seatId) && seat.avaliable
                          },
                          {
                            'seat-selected': state.chosen.seats.has(seat.seatId)
                          }
                        ])}>
                        {seat.seatId}
                      </div>
                    ))}
                  </div>
                );
              })}
          </div>
        </div>

        <Card style={{background: '#fafafa'}}>
          <div className="flex space-between">
            <div className="text-muted">Chosen</div>
            <div>{Array.from(state.chosen.seats).join(', ')}</div>
          </div>
          <div className="flex space-between">
            <div className="text-muted">Summary</div>
            <div className="text-heading">
              {pipe.currency(state.chosen.total).formated} {pipe.currency(state.chosen.total).unit}
            </div>
          </div>
        </Card>
        <div className="flex space-between my-4">
          <div className={cx(['types', 'types-avaliable'])}>Avaliable</div>
          <div className={cx(['types', 'types-selected'])}>Selected</div>
          <div className={cx(['types', 'types-unavaliable'])}>Booked</div>
        </div>
        <div>
          <button className="btn-submit" onClick={handleSubmit}>
            Continue
          </button>
        </div>
      </div>
    </>
  );
};
export default SeatSelection;
