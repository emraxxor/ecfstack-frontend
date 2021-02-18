export interface StatusResponse<T> {
  code: number;
  statusType: string;
  message: string;
  object: T;
}

export enum StatusCode {
  OK = 1,
  INVALID = -1
}
