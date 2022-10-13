/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback, useEffect, useRef, useState} from 'react';
import {LatLngExpression} from 'leaflet';
import moment from 'moment';

import {format} from '~/utils';
import {FragmentHeader, GoogleMap, Modal, ModalRef} from '~/components';
import {ISchedule, ITrip} from '~/interfaces';
import {MutateOptions} from '~/hooks/useInfinityScroll';
import {useInfinityScroll} from '~/hooks';
import InfinityList from '../InfinityList';
import tripApi from '~/apis/trip.api';
import TripForm from './TripForm';
import useApp from '~/hooks/useApp';

const markers: LatLngExpression[] = [
  [21.029468, 105.854445],
  [22.769451, 106.005344]
];

const lines: LatLngExpression[][] = [
  [
    [21.029468, 105.854445],
    [21.029501, 105.853879],
    [21.030331, 105.85391],
    [21.032186, 105.853863],
    [21.032677, 105.855918],
    [21.031519, 105.856473],
    [21.033937, 105.855523],
    [21.03549, 105.855038],
    [21.039759, 105.865941],
    [21.054641, 105.888162],
    [21.055484, 105.888014],
    [21.066922, 105.880843],
    [21.076844, 105.874474],
    [21.08433, 105.870137],
    [21.089317, 105.865537],
    [21.093308, 105.861878],
    [21.113672, 105.845147],
    [21.115668, 105.846246],
    [21.245137, 105.848874],
    [21.257199, 105.848028],
    [21.329184, 105.870023],
    [21.387971, 105.871941],
    [21.404928, 105.872444],
    [21.412121, 105.872701],
    [21.414165, 105.872408],
    [21.440078, 105.862262],
    [21.488999, 105.874965],
    [21.508455, 105.870489],
    [21.50823, 105.866966],
    [21.622351, 105.791537],
    [21.622735, 105.791427],
    [21.625045, 105.787906],
    [21.931056, 105.796866],
    [22.078351, 105.881517],
    [22.114035, 105.849757],
    [22.133136, 105.830727],
    [22.137078, 105.830166],
    [22.15377, 105.849005],
    [22.154703, 105.848722],
    [22.168372, 105.846255],
    [22.182478, 105.846465],
    [22.188892, 105.846674],
    [22.29631, 105.905422],
    [22.310337, 105.903268],
    [22.378792, 105.892845],
    [22.384764, 105.919737],
    [22.388434, 105.931199],
    [22.398989, 105.933536],
    [22.432932, 105.998009],
    [22.551368, 106.08833],
    [22.55387, 106.08947],
    [22.558853, 106.131068],
    [22.683425, 106.216744],
    [22.683587, 106.216708],
    [22.775734, 106.124056],
    [22.776799, 106.121022],
    [22.799883, 106.036732],
    [22.796534, 106.036512],
    [22.798207, 106.036329],
    [22.79816, 106.03622],
    [22.769451, 106.005344]
  ]
];

const TripDetails = () => {
  const {toast, params} = useApp();
  const [trip, setTrip] = useState<ITrip>();
  const [page, setPage] = useState(0);
  const options = useRef<MutateOptions>({
    map: (schedule: any) => schedule,
    distinct: (schedule: ISchedule) => [schedule.id, schedule]
  });
  const query = useRef({tripId: params.id});
  const [hasMore, schedules] = useInfinityScroll(`rest/schedules`, page, query.current, options.current);
  const modalRef = useRef<ModalRef>(null);

  const getTrips = async (abortController?: AbortController) => {
    const {error, data} = await tripApi.getOne(params.id as string, abortController?.signal);
    if (error) {
      toast.show(error.message);
      return null;
    }

    const {_count, ...rest} = data;
    const trip: ITrip = {...rest, schedulesCount: _count.schedules};
    return trip;
  };

  useEffect(() => {
    const abortController = new AbortController();

    getTrips(abortController).then(data => {
      data && setTrip(data);
    });

    return () => abortController.abort();
  }, []);

  const updateSuccessHandler = useCallback(() => {
    modalRef.current?.close();
    getTrips().then(data => {
      data && setTrip(data);
    });
  }, []);

  return (
    <>
      <FragmentHeader title="Trips" action={trip && <button onClick={() => modalRef.current?.show()}>Change</button>} />

      <div className="container">
        <div style={{position: 'relative'}}>
          <GoogleMap customStyle={{mapContainer: 'mb-3'}} markers={markers} lines={lines} />
        </div>

        <div className="text-title my-3">
          {trip?.from.name} - {trip?.to.name}
        </div>
        <div className="card flex space-between mb-3">
          <div className="text-center ">
            <div className="text-muted">Distance</div>
            <div className="text-title">{format.distance(trip?.distance)}</div>
          </div>
          <div className="text-center">
            <div className="text-muted">Times</div>
            <div className="text-title">{format.duration(trip?.travelTime)}</div>
          </div>
          <div className="text-center">
            <div className="text-muted">Schedules</div>
            <div className="text-title">{trip?.schedulesCount}</div>
          </div>
        </div>

        {schedules.length > 0 && (
          <>
            <div className="text-title my-3">Schedules </div>
            <InfinityList
              hasMore={hasMore}
              entries={schedules}
              loadMore={() => setPage(page => page + 1)}
              render={(schedule: ISchedule) => (
                <div className="card flex space-between mb-3">
                  <div>
                    <div className="text-muted">arrival at {moment(schedule.end).format('hh:mm A')}</div>
                    <div>{moment(schedule.start).format('hh:mm A')}</div>
                  </div>

                  <div className="text-right">
                    <div className="text-muted">
                      {schedule.date ? (
                        <span className="text-decoration-circle-pink">
                          {moment(schedule.date).format('ddd, DD/MM, YYYY')}
                        </span>
                      ) : (
                        <span className="text-decoration-circle-green">Daily</span>
                      )}
                    </div>
                    <div>{schedule.title} &nbsp;</div>
                  </div>
                </div>
              )}
            />
          </>
        )}
      </div>

      <Modal ref={modalRef} title="Update trips">
        <TripForm initValue={trip} onSuccess={updateSuccessHandler} />
      </Modal>
    </>
  );
};

export default TripDetails;
