import { IResponse } from '~/interfaces';
import axiosClient from './axios.client';

const url = '/rest/schedules';
const scheduleApi = {
    getAll: (query: any, signal: AbortSignal): Promise<IResponse> => {
        return axiosClient.get(url, { params: query, signal: signal });
    },
};

export default scheduleApi;
