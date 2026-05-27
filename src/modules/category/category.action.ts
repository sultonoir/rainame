import { cacheLife } from "next/cache";
import { AppError, failure } from "../error/error.helper";
import { Result } from "../error/error.type";
import { CategoryService } from "./category.service";
import { Category } from "./category.types";

const categoryService = new CategoryService();

export const getCategories = async (): Promise<Result<Category[]>> => {
  "use cache";
  cacheLife("max");

  try {
    const categories = await categoryService.getAll();

    if (!categories.length) {
      return failure(
        new AppError("Category not found", 404, "CATEGORY_NOT_FOUND"),
      );
    }

    return {
      ok: true,
      data: categories,
    };
  } catch (err) {
    return failure(err);
  }
};
