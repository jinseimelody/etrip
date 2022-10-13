import {FieldValues, useForm} from 'react-hook-form';
import {useCallback, useState} from 'react';

import {Alert, SelectOption, Select} from '~/components';
import {IEndPoint, IError} from '~/interfaces';
import {strIncludes} from '~/helper';
import {useValidate} from '~/hooks';
import endPointApi from '~/apis/end.point.api';

const provinces: SelectOption[] = require('./provinces.json');

type EndPointFormProps = {
  initValue?: any;
  onSuccess?: () => any;
  onFailure?: (error: IError) => any;
};

const EndPointForm: React.FC<EndPointFormProps> = ({initValue, onSuccess, onFailure}) => {
  const [filteredProvinces, setFilteredProvinces] = useState<SelectOption[] | undefined>();

  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    setError,
    formState: {errors, isSubmitting}
  } = useForm();
  const {valid, messages} = useValidate({...errors});

  const submitCallback = async (form: FieldValues) => {
    const response = initValue
      ? await endPointApi.update(initValue.id, form as IEndPoint)
      : await endPointApi.create(form as IEndPoint);
    const {error} = response;
    if (error) {
      setError('name', {type: 'custom', message: error.message});
      onFailure && onFailure(error);
      return;
    }

    return onSuccess && onSuccess();
  };

  const validation = !valid && (
    <div className="mb-3">
      <Alert onClose={() => clearErrors()}>
        {messages.map((message, i) => (
          <div key={i}>{message}</div>
        ))}
      </Alert>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(submitCallback)}>
      <div className={'container'}>
        {validation}
        <div className="flex mb-3">
          <input
            placeholder="Endpoint name"
            defaultValue={initValue?.name}
            {...register('name', {
              required: 'Endpoint name is required'
            })}
          />
        </div>
        <div className="flex">
          <Select
            initState={{expand: true, value: initValue?.district}}
            label="Province, City"
            options={filteredProvinces ? filteredProvinces : provinces}
            onSearch={useCallback((pattern: string) => {
              setFilteredProvinces(provinces.filter(x => strIncludes(x.display, pattern)));
            }, [])}
            onFilterClear={useCallback(() => {
              setFilteredProvinces(undefined);
            }, [])}
            hookField={{
              setValue,
              register: register('district', {
                required: 'Province, City is required'
              })
            }}
          />
        </div>
        <div className="flex">
          <button className="btn-submit" disabled={isSubmitting}>
            {initValue ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EndPointForm;
