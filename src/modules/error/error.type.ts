export type ErrorPayload<T = unknown> = {
  message: string;
  status: number;
  code: string;
  details?: T;
};

export type Success<T> = {
  ok: true;
  data: T;
};

export type Failure<T = unknown> = {
  ok: false;
  error: ErrorPayload<T>;
};

export type Result<T> = Success<T> | Failure;

export type ValidationDetails = {
  errors: Record<string, string[]>;
};
