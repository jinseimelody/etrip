import moment from 'moment';
import {useRef, useState} from 'react';

import {ISchedule} from '~/interfaces';
import {useInfinityScroll} from '~/hooks';
import InfinityList from '../InfinityList';
import {MutateOptions} from '~/hooks/useInfinityScroll';

type ScheduleRecentProps = {
  tripId: number;
};

const ScheduleRecent: React.FC<ScheduleRecentProps> = ({tripId}) => {
  const [page, setPage] = useState(0);
  const [hasMore, recentSchedules] = useInfinityScroll(
    `rest/schedules`,
    page,
    {tripId},
    useRef<MutateOptions>({
      map: (schedule: any) => schedule,
      distinct: (schedule: ISchedule) => [schedule.id, schedule]
    }).current
  );

  return (
    <>
      <div>
        {recentSchedules.length ? (
          <InfinityList
            hasMore={hasMore}
            entries={recentSchedules}
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
        ) : (
          <div>No data had been found...</div>
        )}
      </div>
    </>
  );
};

export default ScheduleRecent;
