import { z } from "zod";
import { AppError } from "../error/error.helper";

type ValidationDetails = {
  errors: Record<string, string[]>;
};
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
      throw new AppError<ValidationDetails>("Validation failed", 400, "VALIDATION_ERROR", {
        errors: this.formatErrors(result.error),
      });
    }

    return result.data;
  }

  private static formatErrors<T>(
    error: z.ZodError<T>,
  ): Record<string, string[]> {
    const tree = z.treeifyError(error);

    if (!("properties" in tree) || !tree.properties) {
      return {};
    }

    return Object.fromEntries(
      Object.entries(tree.properties).map(([key, value]) => [
        key,
        value &&
        typeof value === "object" &&
        "errors" in value &&
        Array.isArray(value.errors)
          ? value.errors
          : [],
      ]),
    );
  }
}
