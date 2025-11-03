"use client";

import { AddToCartButton } from "@/components/addToCart";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductWithCategory } from "@/types/productTypes";
import { ProductDetailSkeleton } from "@/components/ui/loading-skeleton";
import { useCart } from "@/context/CartContext";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const id = params.id as string;
  const [product, setProduct] = useState<ProductWithCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [buyNowLoading, setBuyNowLoading] = useState(false);

  const handleBuyNow = () => {
    if (!product) return;
    router.push(`/buy-now/${product.id}`);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to fetch product");

        setProduct(data.product);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) return <ProductDetailSkeleton />;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!product) return <p className="text-center mt-10">Product not found</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-6 bg-white rounded-lg shadow mt-3">
      {/* Product Image */}
      <div className="md:w-1/2 flex justify-center items-center">
        <img
          src={product.image || ""}
          alt={product.name}
          className="object-contain h-80 w-full rounded-lg"
        />
      </div>

      {/* Product Info */}
      <div className="md:w-1/2 flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
        <p className="text-gray-500 text-sm">Category: {product.category?.name}</p>
        <p className="text-2xl font-semibold text-green-600"> ₹{product.price.toFixed(0)}</p>
        <p className="text-gray-700">{product.description}</p>

        <div className="flex gap-4">
          <AddToCartButton productId={product.id} />
          <button
            onClick={handleBuyNow}
            disabled={buyNowLoading}
            className="mt-4 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
          >
            {buyNowLoading ? "Processing..." : "Buy Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
