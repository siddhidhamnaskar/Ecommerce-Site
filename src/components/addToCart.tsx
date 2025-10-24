"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

interface AddToCartButtonProps {
  productId: string;
}

export function AddToCartButton({ productId }: AddToCartButtonProps) {
  const { addToCart, loading } = useCart();

  const handleAddToCart = async () => {
    try {
      await addToCart(productId);
      alert("Added to cart!");
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
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
