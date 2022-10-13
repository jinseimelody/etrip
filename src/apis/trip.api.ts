import { IResponse, ITrip } from '~/interfaces';
import axiosClient from './axios.client';

const url = '/rest/trips';
const tripApi = {
    getFirst: (signal?: AbortSignal): Promise<IResponse> => {
        return axiosClient.get(url + '/first', { signal: signal });
    },
    getOne: (id: number | string, signal?: AbortSignal): Promise<IResponse> => {
        return axiosClient.get(url + '/' + Number(id), { signal: signal });
    },
    create: (data: ITrip): Promise<IResponse> => {
        return axiosClient.post(url, { ...data });
    },
    update: (id: number | string, data: ITrip): Promise<IResponse> => {
        return axiosClient.put(url + '/' + Number(id), { ...data });
    },
    delete: (ids: number[] | string[]): Promise<IResponse> => {
        return axiosClient.patch(url, { ids: ids.map(x => Number(x)) });
    },
};

export default tripApi;
