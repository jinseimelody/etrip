import classNames from 'classnames';
import {ChangeEvent, useRef, useState} from 'react';
import useInfinityScroll, {MutateOptions} from '~/hooks/useInfinityScroll';
import {ITrip} from '~/interfaces';
import {format} from '~/utils';
import InfinityList from '../InfinityList';

type FilterProps = {
  trip: any;
  onTripSelect: (trip: any) => any;
};

const ScheduleFilter: React.FC<FilterProps> = ({trip, onTripSelect}) => {
  const [search, setSearch] = useState<string>('');
  const [tripPage, setTripPage] = useState(0);
  const [tripQuery, setTripQuery] = useState({pattern: search ? search : null});
  const [hasMore, trips] = useInfinityScroll(
    'rest/trips',
    tripPage,
    tripQuery,
    useRef<MutateOptions>({
      map: (trip: any) => {
        const {_count, ...rest} = trip;
        return {
          ...rest,
          schedulesCount: _count.schedules
        };
      },
      distinct: (trip: ITrip) => [trip.id, trip]
    }).current
  );

  const timeoutId = useRef<any>(null);
  const handleSearchbox = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    timeoutId.current && clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      setTripQuery({pattern: e.target.value});
    }, 500);
  };

  return (
    <div className="px-3">
      <div className="text-title mb-3">Trips list</div>
      <input value={search} onChange={handleSearchbox} placeholder="Search..." className="mb-3" />
      <InfinityList
        hasMore={hasMore}
        entries={trips}
        loadMore={() => setTripPage(page => page + 1)}
        render={(entry: ITrip) => (
          <div
            className={classNames({'bg-oldlace': trip?.id === entry.id}, 'card flex mb-3 cursor-pointer')}
            onClick={() => onTripSelect(entry)}>
            <div className="grow-1">
              <div className="text-muted mb-2">
                {format.distance(entry.distance)}, {format.duration(entry.travelTime)}
              </div>
              <div className="text-ellipsis">
                {entry.from.name} - {entry.to.name}
              </div>
            </div>
            <div>
              <div className="text-muted text-right mb-2 ">schedule</div>
              <div className="text-right">{entry.schedulesCount}</div>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default ScheduleFilter;
