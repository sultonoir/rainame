import { Failure, Success } from "./error.type";

export class AppError extends Error {
  constructor(
    message: string,
    public status = 500,
    public code = "INTERNAL_ERROR",
  ) {
    super(message);
    this.name = "AppError";
  }

  toJSON() {
    return {
      message: this.message,
      status: this.status,
      code: this.code,
    };
  }
}

export const success = <T>(data: T): Success<T> => ({
  ok: true,
  data,
});

export const failure = (err: unknown): Failure => {
  const error =
    err instanceof AppError
      ? err
      : new AppError("Unexpected error", 500, "INTERNAL_ERROR");

  return {
    ok: false,
    error: error.toJSON(),
  };
};
