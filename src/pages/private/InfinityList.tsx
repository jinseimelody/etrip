/* eslint-disable react-hooks/exhaustive-deps */
import {memo, useCallback, useRef} from 'react';

type InfinityListProps = {
  hasMore: boolean;
  entries: any[];
  render: any;
  loadMore: () => any;
};

const InfinityList: React.FC<InfinityListProps> = ({entries, hasMore, render, loadMore}) => {
  const observer = useRef<any>(null);
  const lastElementRef = useCallback(
    (node: any) => {
      if (!node) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMore, entries]
  );

  return (
    <>
      {entries.map((entry: any, i: number) => (
        <div key={i} ref={entries.length - 1 === i ? lastElementRef : undefined}>
          {render(entry)}
        </div>
      ))}
    </>
  );
};

export default memo(InfinityList);
