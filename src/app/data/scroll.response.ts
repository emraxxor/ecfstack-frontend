export interface ScrollResponse<T> {
  data: Array<T>;
  token: string;
  total: number;
  count: number;
}
