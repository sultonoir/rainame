import { ValidationHelper } from "../validation/validation.helper";
import { toProductCardDto, toProductDetailDto } from "./product.mapper";
import { ProductRepo } from "./product.repo";
import { inputMetadata, ProductCardSort } from "./product.types";

/**
 * Service responsible for product business logic.
 *
 * Responsibilities:
 * - Validate input
 * - Handle business rules
 * - Fetch product data from repository
 * - Transform data if needed
 */
export class ProductService {
  constructor(
    /**
     * Creates ProductService instance.
     *
     * @param productRepo Repository for product persistence operations.
     */
    private readonly productRepo = new ProductRepo(),
  ) {}

  async getProductCard(sort: ProductCardSort) {
    const rawProducts = await this.productRepo.findCards(sort);
    return toProductCardDto(rawProducts);
  }

  /**
   * Get metadata product by slug.
   *
   * Flow:
   * 1. Validate input
   * 2. Fetch product
   * 3. return null if product not found
   *
   * @param input Raw input data (untrusted source).
   * @returns Product data.

   */
  async getProductMetadata(input: unknown) {
    const data = ValidationHelper.validateOrNull(inputMetadata, input);

    if (!data) return null;
    const metadata = await this.productRepo.findMetadata(data.slug);
    return metadata;
  }

  /**
   * Get product by slug.
   *
   * Flow:
   * 1. Validate input
   * 2. Fetch product
   * 3. return null if product not found
   *
   * @param input Raw input data (untrusted source).
   * @returns Product data.

   */
  async getProductDetail(input: unknown) {
    const data = ValidationHelper.validateOrNull(inputMetadata, input);

    if (!data) return null;

    const rawProduct = await this.productRepo.findDetail(data.slug);

    return toProductDetailDto(rawProduct);
  }
}
