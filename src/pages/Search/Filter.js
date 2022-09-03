/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {AiOutlineClockCircle} from 'react-icons/ai';
import {
  TiArrowUnsorted,
  TiArrowSortedDown,
  TiArrowSortedUp
} from 'react-icons/ti';
import {IoMdCheckmark} from 'react-icons/io';
import {GoSettings} from 'react-icons/go';

import {InputGroup, Modal} from '~/components';

const SORT_TYPES = [undefined, 'desc', 'asc'];
const TIMES = [
  {id: 'early_morning', content: ['Early morning', '00:00 - 06:00']},
  {id: 'morning', content: ['Morning', '06:01 - 12:00']},
  {id: 'afternoon', content: ['Afternoon', '12:01 - 18:00']},
  {id: 'night', content: ['Midnight', '18:01 - 23:59']}
];
const SEATS = ['standard', 'limousine'];

const Filter = React.memo(({onChange}) => {
  const [state, setState] = useState({
    time: undefined,
    layoutId: undefined,
    nonBookedCount: undefined,
    sortBy: undefined,
    sortType: undefined
  });
  const [clonedState, setClonedState] = useState({
    layoutId: state.layoutId,
    nonBookedCount: state.nonBookedCount
  });

  const filterPopupRef = useRef();
  const departureTimePopupRef = useRef();
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current && onChange) onChange(state);
    return () => (didMount.current = true);
  }, [state]);

  const resetFilter = () => {
    setClonedState({
      layoutId: state.layoutId,
      nonBookedCount: state.nonBookedCount
    });
  };

  const applyFilter = () => {
    setState({
      ...state,
      layoutId: clonedState.layoutId,
      nonBookedCount: clonedState.nonBookedCount
    });
  };

  return (
    <>
      <Modal
        ref={filterPopupRef}
        cancel="Cancel"
        title="Advance search"
        confirm="Apply"
        onCancel={resetFilter}
        onConfirm={applyFilter}>
        <div className="mb-3">
          <div className="flex space-between">
            <div className="text-title mb-3">Seat types</div>
            {(clonedState.layoutId || clonedState.nonBookedCount) && (
              <div
                className="text-right text-link"
                onClick={() =>
                  setClonedState({
                    layoutId: undefined,
                    nonBookedCount: undefined
                  })
                }>
                Clear all
              </div>
            )}
          </div>
          <InputGroup>
            {SEATS.map((x, i) => (
              <div
                key={i}
                className="flex space-between cursor-pointer"
                onClick={() =>
                  setClonedState({
                    ...clonedState,
                    layoutId: clonedState.layoutId === x ? undefined : x
                  })
                }>
                <div className="text-capitalize">{x}</div>
                {clonedState.layoutId === x && <IoMdCheckmark />}
              </div>
            ))}
          </InputGroup>
        </div>
        <div>
          <div className="text-title mb-3">Number of available seats</div>
          <InputGroup>
            <div className="flex flex-nowrap space-between">
              <input
                placeholder="Type a number"
                type="number"
                onChange={e =>
                  setClonedState({
                    ...clonedState,
                    nonBookedCount:
                      e.target.value === '' ? undefined : e.target.value
                  })
                }
                value={clonedState.nonBookedCount || ''}
              />
            </div>
          </InputGroup>
        </div>
      </Modal>
      <Modal ref={departureTimePopupRef} cancel="Cancel" title="Departure Time">
        <InputGroup>
          {TIMES.map((t, i) => (
            <div
              key={i}
              className="flex space-between cursor-pointer"
              onClick={() => {
                setState({
                  ...state,
                  time: state.time === t.id ? undefined : t.id
                });
                departureTimePopupRef.current.hide();
              }}>
              <div>
                {t.content[0]} &nbsp;&nbsp;
                <span className="text-muted">({t.content[1]})</span>
              </div>
              {state.time === t.id && <IoMdCheckmark />}
            </div>
          ))}
        </InputGroup>
      </Modal>
      <div>
        <div className="flex">
          <button
            className="btn-icon mr-3 mb-3"
            onClick={() => filterPopupRef.current.show()}>
            <GoSettings /> Filter
          </button>
          <button
            className="btn-icon mr-3 mb-3"
            onClick={() => departureTimePopupRef.current.show()}>
            <AiOutlineClockCircle />
            {state.time === undefined
              ? 'Time'
              : TIMES.find(x => x.id === state.time).content[1]}
          </button>
          <button
            className="btn-icon mr-3 mb-3"
            onClick={() =>
              setState({
                ...state,
                sortBy: 'price',
                sortType:
                  SORT_TYPES[(SORT_TYPES.indexOf(state.sortType) + 1) % 3]
              })
            }>
            {
              {
                undefined: <TiArrowUnsorted />,
                asc: <TiArrowSortedUp />,
                desc: <TiArrowSortedDown />
              }['' + state.sortType]
            }
            Price
          </button>
        </div>
      </div>
    </>
  );
});

export default Filter;
