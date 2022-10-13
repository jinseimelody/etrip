/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useRef, useState} from 'react';
import {MdFilterAlt} from 'react-icons/md';

import {Button, Modal, ModalRef} from '~/components';
import {format} from '~/utils';
import {ITrip} from '~/interfaces';
import {useTab} from '~/hooks';
import classNames from 'classnames';
import ScheduleFilter from './ScheduleFilter';
import ScheduleHistory from './ScheduleHistory';
import ScheduleRecent from './ScheduleRecent';
import tripApi from '~/apis/trip.api';

const RECENT = 'recent';
const HISTORY = 'history';

const Schedule = () => {
  const [trip, setTrip] = useState<any>(null);
  const {tab, goTo} = useTab([
    {
      name: RECENT,
      element: <ScheduleRecent tripId={trip?.id} />
    },
    {
      name: HISTORY,
      element: <ScheduleHistory tripId={trip?.id} />
    }
  ]);
  const modalRef = useRef<ModalRef>(null);

  useEffect(() => {
    tripApi.getFirst().then(res => {
      const {error, data} = res;
      if (error) return;

      setTrip(data);
    });
  }, []);

  const handleTripSelect = (trip: ITrip) => {
    modalRef.current?.close();
    setTrip(trip);
  };

  return (
    <>
      <div className="flex space-between mb-3">
        <div className="text-heading">
          Schedules <span className="text-muted"></span>
        </div>
        <div>
          <Button type="primary" onClick={() => modalRef.current?.show()}>
            <MdFilterAlt />
          </Button>
        </div>
      </div>
      {trip && (
        <>
          <div className="mb-3">
            <div>
              {trip?.from.name} - {trip?.to.name}
            </div>
            <div>
              {format.distance(trip?.distance)}, {format.duration(trip?.travelTime)}
            </div>
          </div>
          <div>
            <button className={classNames('btn', {'btn-default': tab.name !== RECENT})} onClick={() => goTo(RECENT)}>
              Recent
            </button>
            <button className={classNames('btn', {'btn-default': tab.name !== HISTORY})} onClick={() => goTo(HISTORY)}>
              History
            </button>
            <hr />
            {tab.element}
          </div>
        </>
      )}

      <Modal ref={modalRef} title="Some thing">
        <ScheduleFilter trip={trip} onTripSelect={handleTripSelect} />
      </Modal>
    </>
  );
};

export default Schedule;
