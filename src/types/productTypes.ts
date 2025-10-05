export type ProductWithCategory = {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  category?: { id: string; name: string } | null;
};

export type Filters = {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  order?: string;
};