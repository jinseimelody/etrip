import {useForm} from 'react-hook-form';
import {useNavigate, useParams} from 'react-router-dom';

const CustomerContact = () => {
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors}
  } = useForm();

  const submitCallback = data => {
    navigate(`/reservation/3/${params.scheduleId}/${params.date}`);
  };

  return (
    <>
      <div className="flex flex-start flex-nowrap space-between mb-4">
        <div className="text-hero animate__animated animate__fadeInLeft">
          How to contact you?
        </div>
        <div className="avatar"></div>
      </div>
      <form onSubmit={handleSubmit(submitCallback)}>
        <div className="mb-3">
          <input placeholder="Full name" {...register('fullName')} />
        </div>
        <div className="flex mb-3">
          <div className="text-bold mr-3">+84</div>
          <div className="flex-grow-1">
            <input
              type="text"
              placeholder="Phone number"
              {...register('phone')}
            />
          </div>
        </div>
        <div className="mb-3">
          <input type="text" placeholder="Email" {...register('email')} />
        </div>
        <div>
          <textarea
            rows="4"
            placeholder="Note to our staff..."
            {...register('note')}></textarea>
        </div>
        <button className="btn-submit">Continue</button>
      </form>
    </>
  );
};

export default CustomerContact;
