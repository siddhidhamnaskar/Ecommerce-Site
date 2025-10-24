"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function CartPage() {
  const { items, total, refreshCart } = useCart();

 const [loadingItemId, setLoadingItemId] = useState<string | null>(null);
 const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);

const handleRemoveItem = async (itemId: string) => {
  setLoadingItemId(itemId);
  try {
    const res = await fetch(`/api/cart/${itemId}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) await refreshCart();
  } catch (error) {
    console.error(error);
  } finally {
    setLoadingItemId(null);
  }
};



  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setUpdatingItemId(itemId)
    try {
      const res = await fetch(`/api/cart/${itemId}`, {
        method: "PATCH",
        body: JSON.stringify({ quantity: newQuantity }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (res.ok) {
        await refreshCart();
      }
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }finally{
      setUpdatingItemId(null);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <p className="text-gray-600">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      

      <div className="space-y-4">
        {items && items.map((item) => (
          <div key={item.id} className="flex items-center border rounded-lg p-4">
            {item.product.image && (
              <Image
                src={item.product.image}
                alt={item.product.name}
                width={80}
                height={80}
                className="rounded-lg mr-4"
              />
            )}
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{item.product.name}</h3>
              <p className="text-gray-600">${item.product.price.toFixed(2)}</p>
            </div>
            {/* Quantity Control */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
              disabled={updatingItemId === item.id}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              -
            </button>
            <span className="px-3 py-1">
              {updatingItemId === item.id ? "..." : item.quantity}
            </span>
            <button
              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
              disabled={updatingItemId === item.id}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              +
            </button>
          </div>
            <div className="ml-4">
              <p className="text-lg font-semibold">
                ₹{(item.product.price * item.quantity).toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => handleRemoveItem(item.id)}
              disabled={loadingItemId === item.id}
              className={`ml-4 px-4 py-2 rounded text-white ${
                loadingItemId === item.id ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {loadingItemId === item.id ? "Removing..." : "Remove"}
            </button>

          </div>
        ))}
      </div>

      <div className="mt-8 border-t pt-4">
        <div className="flex justify-between items-center">
          <span className="text-xl font-semibold">Total: ${total.toFixed(2)}</span>
          <button className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
