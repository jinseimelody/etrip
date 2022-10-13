/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback, useRef, useState} from 'react';
import {BsFillTrash2Fill} from 'react-icons/bs';
import {GoKebabHorizontal} from 'react-icons/go';
import {MdOutlineAdd} from 'react-icons/md';
import tripApi from '~/apis/trip.api';

import {Button, CardControl, Checkbox, Fab, Modal, ModalRef} from '~/components';
import {useInfinityScroll} from '~/hooks';
import useApp from '~/hooks/useApp';
import {MutateOptions} from '~/hooks/useInfinityScroll';
import {IError, ITrip} from '~/interfaces';
import {format} from '~/utils';
import InfinityList from '../InfinityList';
import TripForm from './TripForm';

const Trip = () => {
  const {toast, loading, navigate} = useApp();

  const options = useRef<MutateOptions>({
    map: (trip: any) => {
      const {_count, ...rest} = trip;
      return {
        ...rest,
        schedulesCount: _count.schedules
      };
    },
    distinct: (trip: ITrip) => [trip.id, trip]
  });
  const [page, setPage] = useState<number>(0);
  const [query, setQuery] = useState<any>();
  const [hasMore, trips] = useInfinityScroll('rest/trips', page, query, options.current);
  const [selected, setSelected] = useState(new Set<number>());
  const [selecting, setSelecting] = useState(false);

  const modalRef = useRef<ModalRef>(null);

  const handleItemClick = (trip: ITrip) => {
    if (!selecting) return navigate('/m/trips/' + trip.id);

    setSelected(selected => {
      const nextSelected = new Set(selected);
      const id = trip.id as number;
      nextSelected.has(id) ? nextSelected.delete(id) : nextSelected.add(id);
      return nextSelected;
    });
  };

  const handleDeleteButtonClick = useCallback(() => {
    toast.show('You wanna delete this trips', {
      type: 'confirm',
      onConfirm: async () => {
        loading.show();
        const {error} = await tripApi.delete(Array.from(selected));
        loading.hide();
        if (error) {
          toast.show(error.message);
          return;
        }

        setSelected(new Set());
        setSelecting(false);
        setPage(0);
        setQuery({});
      }
    });
  }, [selected]);

  const screenActions = (
    <div>
      {!selecting && (
        <>
          <Button type="primary" onClick={() => modalRef.current?.show()}>
            <MdOutlineAdd />
          </Button>
          <Button type="primary" customClass="ml-2" onClick={() => setSelecting(true)}>
            <GoKebabHorizontal />
          </Button>
        </>
      )}

      {selecting && (
        <Button
          type="primary"
          onClick={() => {
            setSelected(new Set());
            setSelecting(false);
          }}>
          <div className="px-2">Cancel</div>
        </Button>
      )}
    </div>
  );

  return (
    <>
      <div className="flex space-between mb-3">
        <div className="text-heading">
          Route trips <span className="text-muted">display: {trips.length} items</span>
        </div>
        {screenActions}
      </div>
      <InfinityList
        hasMore={hasMore}
        entries={trips}
        loadMore={() => setPage(page => page + 1)}
        render={useCallback(
          (trip: ITrip) => (
            <div onClick={() => handleItemClick(trip)}>
              <CardControl
                expand={selecting}
                action={
                  <>
                    <Checkbox selected={selected.has(trip.id as number)} />
                  </>
                }>
                <div className="grow-1">
                  <div className="text-muted mb-2">
                    {format.distance(trip.distance)}, {format.duration(trip.travelTime)}
                  </div>
                  <div className="text-ellipsis">
                    {trip.from.name} - {trip.to.name}
                  </div>
                </div>
                <div>
                  <div className="text-muted text-right mb-2 ">schedule</div>
                  <div className="text-right">{trip.schedulesCount}</div>
                </div>
              </CardControl>
            </div>
          ),
          [selecting, selected]
        )}
      />

      {selecting && (
        <Fab>
          <Fab.Button disabled={selected.size === 0} onClick={handleDeleteButtonClick}>
            <BsFillTrash2Fill />
          </Fab.Button>
        </Fab>
      )}
      <Modal ref={modalRef} title="New trip">
        <TripForm
          onSuccess={useCallback(() => {
            modalRef.current?.close();
            setPage(0);
            setQuery({});
          }, [])}
          onFailure={useCallback((error: IError) => {
            toast.show(error.message);
          }, [])}
        />
      </Modal>
    </>
  );
};

export default Trip;
