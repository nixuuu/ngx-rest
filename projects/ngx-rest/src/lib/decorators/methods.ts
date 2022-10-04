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
export const Head = MethodDecorator(Methods.HEAD);
export const Post = MethodDecorator(Methods.POST);
export const Put = MethodDecorator(Methods.PUT);
export const Delete = MethodDecorator(Methods.DELETE);
export const Connect = MethodDecorator(Methods.CONNECT);
export const Options = MethodDecorator(Methods.OPTIONS);
export const Trace = MethodDecorator(Methods.TRACE);
export const Patch = MethodDecorator(Methods.PATCH);
