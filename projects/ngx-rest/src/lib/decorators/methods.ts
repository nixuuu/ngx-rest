import 'reflect-metadata';
import { Methods } from '../enums/methods';
import { patchMethod } from '../helpers/patch-method';

const MethodDecorator = (method: Methods) => (path?: string, options?: any) => {
  return <T>(
    target: T,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod = descriptor.value;
    path = path ?? '';

    descriptor.value = patchMethod(method, path, originalMethod);

    return descriptor;
  };
};

export const Get = MethodDecorator(Methods.GET);
export const Post = MethodDecorator(Methods.POST);
