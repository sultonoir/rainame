import { ErrorPayload, Failure, Success } from "./error.type";

export class AppError<T = unknown> extends Error {
  constructor(
    message: string,
    public status: number,
    public code: string,
    public details?: T,
  ) {
    super(message);
  }

  toJSON(): ErrorPayload<T> {
    return {
      message: this.message,
      status: this.status,
      code: this.code,
      details: this.details,
    };
  }
}

export const success = <T>(data: T): Success<T> => ({
  ok: true,
  data,
});

export const failure = <T>(err: unknown): Failure<T> => {
  const error =
    err instanceof AppError
      ? err
      : new AppError("Unexpected error", 500, "INTERNAL_ERROR");

  return {
    ok: false,
    error: error.toJSON(),
  };
};
