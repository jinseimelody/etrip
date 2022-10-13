/* eslint-disable react-hooks/exhaustive-deps */
import {BsFillTrash2Fill} from 'react-icons/bs';
import {GoKebabHorizontal} from 'react-icons/go';
import {MdOutlineAdd} from 'react-icons/md';
import {useCallback, useRef, useState} from 'react';

import {IEndPoint, IError} from '~/interfaces';
import {Modal, ModalRef, CardControl, Fab, Button, Checkbox} from '~/components';
import {MutateOptions} from '~/hooks/useInfinityScroll';
import {useInfinityScroll} from '~/hooks';
import endPointApi from '~/apis/end.point.api';
import EndPointForm from './EndPointForm';
import InfinityList from '../InfinityList';
import useApp from '~/hooks/useApp';

const EndPoint = () => {
  const {toast, loading, navigate} = useApp();

  const [page, setPage] = useState(0);
  const [query, setQuery] = useState({});
  const [hasMore, endpoints] = useInfinityScroll(
    '/rest/endpoints',
    page,
    query,
    useRef<MutateOptions>({
      map: (endpoint: any) => {
        const {fsp, tsp, ...rest} = endpoint;
        return {
          ...rest,
          attend: fsp.length + tsp.length
        };
      },
      distinct: (endpoint: IEndPoint) => [endpoint.id, endpoint]
    }).current
  );
  const [selected, setSelected] = useState(new Set<number>());
  const [selecting, setSelecting] = useState(false);
  const modalRef = useRef<ModalRef>(null);

  const handleItemClick = (endpoint: IEndPoint) => {
    if (!selecting) return navigate('/m/endpoints/' + endpoint.id);

    setSelected(selected => {
      const nextSelected = new Set(selected);
      const id = endpoint.id as number;
      nextSelected.has(id) ? nextSelected.delete(id) : nextSelected.add(id);
      return nextSelected;
    });
  };

  const handleDeleteButtonClick = useCallback(() => {
    toast.show('You wanna delete this endpoints', {
      type: 'confirm',
      onConfirm: async () => {
        loading.show();
        const {error} = await endPointApi.delete(Array.from(selected));
        loading.hide();
        if (error) {
          toast.show(error.message);
          return;
        }

        setSelected(new Set());
        setSelecting(false);
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
          EndPoints <span className="text-muted">display: {endpoints.length} items</span>
        </div>
        {screenActions}
      </div>
      <InfinityList
        hasMore={hasMore}
        entries={endpoints}
        loadMore={useCallback(() => setPage(page => page + 1), [])}
        render={useCallback(
          (endpoint: any) => (
            <div onClick={() => handleItemClick(endpoint)}>
              <CardControl
                expand={selecting}
                action={
                  <>
                    <Checkbox selected={selected.has(endpoint.id as number)} />
                  </>
                }>
                <div className="grow-1">
                  <div className="text-muted mb-2">{endpoint.district}</div>
                  <div className="text-ellipsis">{endpoint.name}</div>
                </div>
                <div>
                  <div className="text-muted text-right mb-2 ">trips</div>
                  <div className="text-right">{endpoint.attend}</div>
                </div>
              </CardControl>
            </div>
          ),
          [selected, selecting]
        )}
      />

      {selecting && (
        <Fab>
          <Fab.Button disabled={selected.size === 0} onClick={handleDeleteButtonClick}>
            <BsFillTrash2Fill />
          </Fab.Button>
        </Fab>
      )}

      <Modal ref={modalRef} title="New end points">
        <EndPointForm
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

export default EndPoint;
