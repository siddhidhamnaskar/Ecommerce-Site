"use client";

import { useState } from "react";

interface AddToCartButtonProps {
  productId: string;
}

export function AddToCartButton({ productId }: AddToCartButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      await fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify({ productId }),
        headers: { "Content-Type": "application/json" },
      });
      alert("Added to cart!");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className="mt-4 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
    >
      {loading ? "Adding..." : "Add to Cart"}
    </button>
  );
}
