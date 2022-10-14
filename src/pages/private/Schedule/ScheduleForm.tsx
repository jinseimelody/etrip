import {FieldValues, useForm} from 'react-hook-form';
import {useCallback, useState} from 'react';
import moment from 'moment';

import {Alert, SelectOption, Select, SwipeButton, Calendar} from '~/components';
import {IEndPoint, IError} from '~/interfaces';
import {strIncludes} from '~/helper';
import {useValidate} from '~/hooks';
import endPointApi from '~/apis/end.point.api';

const DAILY = 'Daily';
const ONCE = 'Once';
type Mode = 'Daily' | 'Once';
type ScheduleFormProps = {
  initValue?: any;
  onSuccess?: () => any;
  onFailure?: (error: IError) => any;
};

const ScheduleForm: React.FC<ScheduleFormProps> = ({initValue, onSuccess, onFailure}) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    setError,
    formState: {errors, isSubmitting}
  } = useForm();
  const {valid, messages} = useValidate({...errors});
  const [scheduleMode, setScheduleMode] = useState(DAILY);

  const submitCallback = async (form: FieldValues) => {
    // const response = initValue
    //   ? await endPointApi.update(initValue.id, form as IEndPoint)
    //   : await endPointApi.create(form as IEndPoint);
    // const {error} = response;
    // if (error) {
    //   setError('name', {type: 'custom', message: error.message});
    //   onFailure && onFailure(error);
    //   return;
    // }
    // return onSuccess && onSuccess();
  };

  // const validation = !valid && (
  //   <div className="mb-3">
  //     <Alert onClose={() => clearErrors()}>
  //       {messages.map((message, i) => (
  //         <div key={i}>{message}</div>
  //       ))}
  //     </Alert>
  //   </div>
  // );

  return (
    <div className="container">
      <form onSubmit={handleSubmit(submitCallback)}>
        <div className="flex space-between mb-3">
          <div>{scheduleMode === DAILY ? 'Daily' : 'Once'}</div>
          <SwipeButton onClick={isOn => setScheduleMode(isOn ? ONCE : DAILY)} />
        </div>
        {scheduleMode === ONCE && (
          <div>
            <div className="flex space-between">
              <div>Ngày</div>
              <button>{moment().format('ddd, DD/MM, YYYY')}</button>
            </div>
            <div>
              <Calendar.Month />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ScheduleForm;
