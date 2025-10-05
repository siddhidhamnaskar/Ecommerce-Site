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
  minPrice?: string;
  maxPrice?: string;
  sortBy?: string;
  order?: string;
};