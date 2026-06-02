import { CategoryRepo } from "./category.repository";
import { Category } from "./category.types";

export class CategoryService {
  constructor(private readonly categoryRepo = new CategoryRepo()) {}
  async getAll(): Promise<Category[]> {
    const categories = await this.categoryRepo.findAll();

    if (!categories.length) {
      return [];
    }

    return categories;
  }
}
