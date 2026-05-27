import { db } from "@/lib/db";

/**
 * repository for retrieving category data
 */

export class CategoryRepo {
  /**
   *  Search all categories and subcategories
   */

  async findAll() {
    return await db.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        subcategories: {
          select: {
            id: true,
            name: true,
            slug: true,
            desc: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });
  }
}
