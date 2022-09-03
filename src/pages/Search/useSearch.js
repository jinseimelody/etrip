import {isIterable} from '~/helper';

/* eslint-disable react-hooks/exhaustive-deps */
const {useEffect, useState} = require('react');
const {tripApi} = require('~/apis');

const useSearch = (query, pageNumber) => {
  const [hasMore, setHasMore] = useState(true);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    setTrips([]);
  }, [query]);

  useEffect(() => {
    const abortController = new AbortController();
    const getCoetoriseTrips = async () => {
      const params = Object.fromEntries(
        Object.entries(query).filter(([_, value]) => value !== undefined)
      );

      const response = await tripApi.search(
        {...params, pageNumber: pageNumber},
        abortController
      );
      setTrips(prev => {
        let nextTrips = [];
        if (isIterable(response)) nextTrips = response;

        return [
          ...new Map(
            [...prev, ...nextTrips].map(x => [x.scheduleId, x])
          ).values()
        ];
      });
      setHasMore(isIterable(response) && response.length > 0);
    };

    getCoetoriseTrips();
    return () => abortController.abort();
  }, [query, pageNumber]);

  return {trips, hasMore};
};

export default useSearch;
