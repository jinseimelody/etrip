/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import axiosClient from '~/apis/axios.client';

export type MutateOptions = {
  map?: (x: any) => any;
  distinct?: (x: any) => any;
};

const useInfinityScroll = (url: string, page: number, query?: any, options?: MutateOptions) => {
  const [hasMore, setHasMore] = useState<any>(true);
  const [entries, setEntries] = useState<any[]>([]);

  const fetch = async (signal: AbortSignal) => {
    const q = query || {};
    const response = await axiosClient.get(url, {
      params: {
        limit: 10,
        skip: page === 0 ? 0 : page * 10,
        ...q
      },
      signal
    });

    const data = response.data as any[];
    setHasMore(data.length === 10);
    setEntries(prev => {
      if (!options) return [...prev, ...data];

      const mapped = options.map ? data.map(options.map) : data;
      const joined = [...prev, ...mapped];
      if (!options.distinct) return joined;

      return Array.from(new Map(joined.map(options.distinct)).values());
    });
  };

  useEffect(() => {
    setHasMore(true);
    entries.length && setEntries([]);
  }, [JSON.stringify(query)]);

  useEffect(() => {
    const c = new AbortController();
    fetch(c.signal);

    return () => c.abort();
  }, [page, JSON.stringify(query)]);

  return [hasMore, entries];
};

export default useInfinityScroll;
