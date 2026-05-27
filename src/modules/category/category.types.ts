export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  desc: string | null;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  subcategories: SubCategory[];
}
