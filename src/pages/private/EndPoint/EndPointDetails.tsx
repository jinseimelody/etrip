/* eslint-disable react-hooks/exhaustive-deps */
import {FragmentHeader, GoogleMap, Modal, ModalRef} from '~/components';
import {HiOutlineLocationMarker} from 'react-icons/hi';
import {useCallback, useEffect, useRef, useState} from 'react';

import {IEndpoint, IError} from '~/interfaces';
import endPointApi from '~/apis/end.point.api';
import EndPointForm from './EndPointForm';
import useApp from '~/hooks/useApp';

const EndPointDetails = () => {
  const {toast, params} = useApp();
  const [endpoint, setEndpoint] = useState<IEndpoint>();
  const modalRef = useRef<ModalRef>(null);

  const getEndPoint = useCallback(async (controller?: AbortController) => {
    const response = await endPointApi.getOne(params.id, controller);
    const {
      error,
      data: {fsp, tsp, ...rest}
    } = response;

    if (error) return null;
    return {...rest, attend: fsp.length + tsp.length};
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    getEndPoint(controller).then(data => {
      setEndpoint(data);
    });

    return () => controller.abort();
  }, []);

  const createSuccessHandler = useCallback(() => {
    modalRef.current?.close();
    getEndPoint().then(data => {
      setEndpoint(data);
    });
  }, []);

  const updateFailureHandler = useCallback((error: IError) => toast.show(error.message), []);

  return (
    <>
      <FragmentHeader
        title="Endpoints"
        action={endpoint && <button onClick={() => modalRef.current?.show()}>Change</button>}
      />

      <div className="container">
        <div style={{position: 'relative'}}>
          <GoogleMap customStyle={{mapContainer: 'mb-3'}} />
          <div className="square-bagged box-shadow">
            <div>
              <div className="text-small">trips</div>
              <div className="text-heading text-ellipsis">{endpoint?.attend}</div>
            </div>
          </div>
        </div>
        <div className="card flex flex-start">
          <div className="overflow-hidden">
            <div className="text-muted">
              <HiOutlineLocationMarker className="mr-2" />
              {endpoint?.district}
            </div>
            <div className="text-ellipsis">{endpoint?.name}</div>
          </div>
        </div>
      </div>

      <Modal ref={modalRef} title="Update EndPoint">
        <EndPointForm initValue={endpoint} onSuccess={createSuccessHandler} onFailure={updateFailureHandler} />
      </Modal>
    </>
  );
};

export default EndPointDetails;
