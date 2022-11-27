import { Request } from 'express';

export type TypedRequestBody<T> = Omit<Request, 'body'> & {
  body: T;
};
