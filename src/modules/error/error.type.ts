export type ErrorPayload = {
  message: string;
  status: number;
  code: string;
};

export type Success<T> = {
  ok: true;
  data: T;
};

export type Failure = {
  ok: false;
  error: ErrorPayload;
};

export type Result<T> = Success<T> | Failure;
