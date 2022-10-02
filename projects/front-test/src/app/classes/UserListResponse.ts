export class UserListResponse {
  data: any[];

  constructor(data: any[]) {
    this.data = data ?? [];
  }

  getFirst() {
    return this.data[0];
  }

  getLast() {
    return this.data[this.data.length - 1];
  }
}
