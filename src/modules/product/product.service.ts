import { AppError } from "../error/error.helper";
import { toProductCardDto } from "./product.mapper";
import { ProductRepo } from "./product.repo";
import { ProductCardSort } from "./product.types";

export class ProductService {
  constructor(private readonly productRepo = new ProductRepo()) {}

  async getProductCard(sort: ProductCardSort) {
    const rawProducts = await this.productRepo.findCards(sort);
    
    if (rawProducts.length === 0) {
      throw new AppError("Products not found", 404, "PRODUCTS_NOT_FOUND");
    }

    return toProductCardDto(rawProducts)
  }
}
