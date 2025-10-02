"use client";

import { useState, useEffect } from "react";

type ProductWithCategory = {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  category?: { id: string; name: string } | null;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to fetch products");

        setProducts(data.products);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading products...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Products</h1>

      {products.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
            >
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg">
                  <span className="text-gray-500 text-sm">No Image</span>
                </div>
              )}

              <div className="mt-4 flex-1 flex flex-col">
                <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                  {product.name}
                </h2>
                {product.category && (
                  <p className="text-sm text-gray-500 mt-1">{product.category.name}</p>
                )}
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                  {product.description}
                </p>

                <p className="mt-auto text-xl font-bold text-indigo-600">
                  ₹{product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
