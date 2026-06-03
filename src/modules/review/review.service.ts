import { ValidationHelper } from "../validation/validation.helper";
import { ReviewRepository } from "./review.repository";
import { inputGetReview } from "./review.type";

export class ReviewService {
  constructor(private readonly reviewRepo = new ReviewRepository()) {}

  async getReviewBySlug(input: unknown) {
    const data = ValidationHelper.validateOrNull(inputGetReview, input);

    if (!data) {
      return null;
    }

    return await this.reviewRepo.findBySlugProduct(data);
  }
}
