export class BaseResponse<T> {
  data: T;

  constructor(data: T) {
    this.data = data;
  }
}
