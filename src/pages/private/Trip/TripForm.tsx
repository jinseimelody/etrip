/* eslint-disable react-hooks/exhaustive-deps */
import {FieldValues, useForm} from 'react-hook-form';
import {useCallback, useEffect, useState} from 'react';

import {Alert, SelectOption, Select} from '~/components';
import {IEndPoint, IError, ITrip} from '~/interfaces';
import {strIncludes} from '~/helper';
import {useValidate} from '~/hooks';
import endPointApi from '~/apis/end.point.api';
import useApp from '~/hooks/useApp';
import tripApi from '~/apis/trip.api';

type TripFormProps = {
  initValue?: any;
  onSuccess?: () => any;
  onFailure?: (error: IError) => any;
};

const TripForm: React.FC<TripFormProps> = ({initValue, onSuccess, onFailure}) => {
  const {loading} = useApp();
  const [endpoints, setEndpoints] = useState<SelectOption[]>([]);
  const [filteredDeparture, setFilteredDeparture] = useState<SelectOption[] | undefined>();
  const [filteredArrival, setFilteredArrival] = useState<SelectOption[] | undefined>();

  useEffect(() => {
    loading.show();
    const abortController = new AbortController();
    const fetch = async () => {
      const {error, data} = await endPointApi.getAll({}, abortController);
      if (error) return;

      setEndpoints(
        data.map(
          (endpoint: IEndPoint): SelectOption => ({
            value: endpoint.id as number,
            display: endpoint.name
          })
        )
      );

      loading.hide();
    };
    fetch();
    return () => abortController.abort();
  }, []);

  const {
    watch,
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    formState: {errors, isSubmitting}
  } = useForm();
  const {valid, messages} = useValidate({...errors});

  const submitCallback = async (form: FieldValues) => {
    console.log(form);
    if (watch('departure') === watch('arrival')) {
      setError('departure', {type: 'custom', message: 'Departure and arrival must not be the same'});
      return;
    }

    const response = initValue
      ? await tripApi.update(initValue.id, form as ITrip)
      : await tripApi.create(form as ITrip);
    const {error} = response;

    if (error) {
      setError('departure', {type: 'custom', message: error.message});
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
        <div className="flex">
          <Select
            initState={{expand: false, value: initValue?.fromId}}
            label="Departure"
            options={filteredDeparture ? filteredDeparture : endpoints}
            onSearch={useCallback(
              (pattern: string) => {
                setFilteredDeparture(endpoints.filter(x => strIncludes(x.display, pattern)));
              },
              [endpoints, filteredDeparture]
            )}
            onFilterClear={useCallback(() => {
              setFilteredDeparture(undefined);
            }, [])}
            hookField={{
              setValue,
              register: register('departure', {
                required: 'Departure is required',
                valueAsNumber: true
              })
            }}
          />
        </div>
        <div className="flex">
          <Select
            initState={{expand: false, value: initValue?.toId}}
            label="Arrival"
            options={filteredArrival ? filteredArrival : endpoints}
            onSearch={useCallback(
              (pattern: string) => {
                setFilteredArrival(endpoints.filter(x => strIncludes(x.display, pattern)));
              },
              [endpoints, filteredArrival]
            )}
            onFilterClear={useCallback(() => {
              setFilteredArrival(undefined);
            }, [])}
            hookField={{
              setValue,
              register: register('arrival', {
                required: 'Arrival is required',
                valueAsNumber: true
              })
            }}
          />
        </div>
        <div className="flex mb-3">
          <input
            placeholder="Distance (m)"
            defaultValue={initValue?.distance}
            type="number"
            {...register('distance', {
              required: 'Distance is required',
              valueAsNumber: true,
              validate: {
                positive: v => parseInt(v) > 0
              }
            })}
          />
        </div>

        <div className="flex mb-3">
          <input
            placeholder="Travel time (min)"
            defaultValue={initValue?.travelTime}
            type="number"
            {...register('travelTime', {
              required: 'Travel time is required',
              valueAsNumber: true,
              validate: {
                positive: v => parseInt(v) > 0
              }
            })}
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

export default TripForm;
