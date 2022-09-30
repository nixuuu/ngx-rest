import {BaseResponse} from "./base-response";

export interface MyData {
  field: string;
}

export class MyDataResponse extends BaseResponse<MyData> {
  constructor(data: MyData) {
    super(data);
  }
}
