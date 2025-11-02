"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle } from "lucide-react";

interface AddToCartButtonProps {
  productId: string;
}

export function AddToCartButton({ productId }: AddToCartButtonProps) {
  const { addToCart, loading } = useCart();
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleAddToCart = async () => {
    try {
      await addToCart(productId);
      setAlert({ type: "success", message: "Added to cart!" });
    } catch (err) {
      console.error(err);
      setAlert({ type: "error", message: "Failed to add to cart" });
    }
  };

  return (
    <>
      {alert && (
        <Alert variant={alert.type === "error" ? "destructive" : "default"} className="mb-4">
          {alert.type === "success" ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <XCircle className="h-4 w-4" />
          )}
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}
      <button
        onClick={handleAddToCart}
        disabled={loading}
        className="mt-4 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
      >
        {loading ? "Adding..." : "Add to Cart"}
      </button>
    </>
  );
}
