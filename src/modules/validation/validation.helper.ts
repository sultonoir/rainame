import { z } from "zod";
import { AppError } from "../error/error.helper";

export class ValidationHelper {
  static validateOrNull<T extends z.ZodType>(
    schema: T,
    data: unknown,
  ): z.infer<T> | null {
    const result = schema.safeParse(data);

    return result.success ? result.data : null;
  }

  static validateOrThrow<T extends z.ZodType>(
    schema: T,
    data: unknown,
  ): z.infer<T> {
    const result = schema.safeParse(data);

    if (!result.success) {
      throw new AppError("Validation failed", 400, "VALIDATION_ERROR", {
        errors: z.treeifyError(result.error),
      });
    }

    return result.data;
  }
}
