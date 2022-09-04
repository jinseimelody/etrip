import {useForm} from 'react-hook-form';

const TicketInfo = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors}
  } = useForm();

  const form = {
    fullName: {...register('fullName')},
    phone: {...register('phone')},
    email: {...register('email')}
  };

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <>
      <div className="flex flex-start flex-nowrap space-between mb-4">
        <div className="text-hero animate__animated animate__fadeInLeft">
          How to contact you?
        </div>
        <div className="avatar"></div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input placeholder="Full name" />
        </div>
        <div className="flex">
          <div>+84</div>
          <div>
            <input type="text" placeholder="Phone number" />
          </div>
        </div>
        <div>
          <input type="text" placeholder="Email" />
        </div>
        <div>
          <textarea placeholder="Note to our staff..."></textarea>
        </div>
        <button className="btn-submit">Continue</button>
      </form>
    </>
  );
};

export default TicketInfo;
