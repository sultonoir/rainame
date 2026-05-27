import { AppError } from "../error/error.helper";
import { CategoryRepo } from "./category.repository";
import { Category } from "./category.types";

export class CategoryService {
  constructor(private readonly categoryRepo = new CategoryRepo()) {}
  async getAll(): Promise<Category[]> {
    const categories = await this.categoryRepo.findAll();

    if (!categories.length) {
      throw new AppError("Categories not found", 404, "CATEGORY_NOT_FOUND");
    }

    return categories;
  }
}
