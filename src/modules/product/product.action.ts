"use server";
import { cacheLife } from "next/cache";
import { inputRecommend, ProductCardSort } from "./product.types";
import { ProductService } from "./product.service";
import { ValidationHelper } from "../validation/validation.helper";
import { failure, success } from "../error/error.helper";

interface Props {
  sort: ProductCardSort;
}

const products = new ProductService();

export const getProductCard = async ({ sort }: Props) => {
  "use cache";
  cacheLife("hours");
  return products.getProductCard(sort);
};

/**
   * Get metadata product by slug.
   *
   *
   * @param input Raw input data (untrusted source).
   * @returns Product data.

   */
export const getMetadata = async (input: unknown) => {
  return await products.getProductMetadata(input);
};

/**
   * Get product detail by slug.
   * @param input Raw input data (untrusted source).
   * @returns Product detail data.

   */
export const getProductDetail = async (input: unknown) => {
  "use cache";
  cacheLife("hours");
  return await products.getProductDetail(input);
};

export const getRecommend = async (input: unknown) => {
  "use cache";
  cacheLife("hours");
  return await products.getProductRecommend(input);
};

export const testServerCommponent = async (input: unknown) => {
  "use cache";
  cacheLife("hours");
  try {
    const data = ValidationHelper.validateOrThrow(inputRecommend, input);
    success(data);
  } catch (error) {
    return failure(error);
  }
};
