import {useForm} from 'react-hook-form';
import {TiTimes} from 'react-icons/ti';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {EMAIL_REGEX, PHONE_NUMBER_REGEX} from '~/constant';
import {setContact} from '~/redux/reservationSlice';

const PassengerContact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const reservation = useSelector(state => state.reservation);
  const {contact} = reservation;

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: {errors}
  } = useForm();

  const submitCallback = data => {
    const ignoreEmptyField = obj => {
      const entries = Object.entries(data).filter(
        ([key, value]) => value !== ''
      );
      return Object.fromEntries(entries);
    };
    dispatch(setContact(ignoreEmptyField(data)));
    navigate(`/reservation/3/${params.scheduleId}/${params.date}`);
  };

  const messages = Object.entries(errors).map(([key, value], i) => (
    <div key={i}>{value.message}</div>
  ));

  return (
    <>
      <div className="flex flex-start flex-nowrap space-between mb-4">
        <div className="text-hero animate__animated animate__fadeInLeft">
          How to contact you?
        </div>
        <div className="avatar"></div>
      </div>

      {messages.length > 0 && (
        <div className="flex border rounded-1 mb-3">
          <div className="p-3 text-active flex-grow-1">{messages}</div>
          <button className="btn-default self-stretch px-3">
            <TiTimes
              onClick={() => clearErrors()}
              style={{fontSize: 'large'}}
            />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit(submitCallback)}>
        <div className="mb-3">
          <label>Passenger</label>
          <input
            placeholder="John doe"
            defaultValue={contact?.passenger}
            {...register('passenger', {
              required: 'Passenger name is required',
              maxLength: {
                value: 100,
                message: 'Passenger name maximum 100 character'
              }
            })}
          />
        </div>

        <div className="mb-3">
          <label>Phone number</label>
          <div className="flex">
            <div className="text-bold mr-3">+84</div>
            <div className="flex-grow-1">
              <input
                type="text"
                defaultValue={contact?.phoneNumber}
                placeholder="961159460"
                {...register('phoneNumber', {
                  required: 'Phone number is required',
                  maxLength: {
                    value: 100,
                    message: 'Phone number maximum 100 character'
                  },
                  pattern: {
                    value: PHONE_NUMBER_REGEX,
                    message: 'Phone number is invalid'
                  }
                })}
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label>
            Email <span className="text-muted">(optional)</span>
          </label>
          <input
            type="text"
            placeholder="example "
            defaultValue={contact?.email}
            {...register('email', {
              maxLength: {
                value: 100,
                message: 'Email maximum 100 character'
              },
              pattern: {value: EMAIL_REGEX, message: 'Phone number is invalid'}
            })}
          />
        </div>

        <div className="mb-3">
          <label>
            Note <span className="text-muted">(optional)</span>
          </label>
          <textarea
            rows="4"
            defaultValue={contact?.note}
            placeholder="Note to our staff..."
            {...register('note', {
              maxLength: {
                value: 100,
                message: 'Email maximum 100 character'
              }
            })}></textarea>
        </div>

        <button className="btn-submit">Continue</button>
      </form>
    </>
  );
};

export default PassengerContact;
