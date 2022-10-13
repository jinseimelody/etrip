export interface IError {
  message: string
}

export interface IResponse {
  status: number,
  data: any,
  error: IError
};

export interface IStore {
  device: {
    width: number,
    height: number
  },
  auth: {
    userName: string,
    email: string,
    password: string,
    accessToken: string,
    roles: string[]
  }
}

export interface IEndpoint {
  id?: number,
  name: string,
  district: string,
  createdDate?: string,
  attend?: number
}

export interface IEndPoint {
  id?: number,
  name: string,
  district: string,
  createdDate?: string,
  attend?: number
}

export interface ITrip {
  id: number,
  fromId: number,
  toId: number,
  distance: number,
  travelTime: number,
  from: IEndPoint,
  to: IEndPoint,
  schedulesCount?: number
}

export interface ISchedule {
  id: number,
  title: string,
  date?: string,
  start: string,
  end: string,
  cron: string,
  cronType: string,
  note: string,
  tripId: number
}
