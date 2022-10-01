export type Constructor<T = any> = {
  [key: string]: any;
  new (...args: any): T;
};
