"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    image?: string;
  };
}

interface CartContextType {
  items: CartItem[];
  total: number;
  refreshCart: () => Promise<void>;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  loading: boolean;
}

const CartContext = createContext<CartContextType>({
  items: [],
  total: 0,
  refreshCart: async () => {},
  addToCart: async () => {},
  loading: false,
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const refreshCart = async () => {
    try {
      const res = await fetch("/api/cart", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
        setTotal(data.total || 0);
      }
    } catch (error) {
      console.error("Failed to refresh cart:", error);
    }
  };

  const addToCart = async (productId: string, quantity = 1) => {
    setLoading(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify({ productId, quantity }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (res.ok) {
        await refreshCart();
      } else {
        throw new Error("Failed to add to cart");
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshCart(); // initial check

  // recheck when tab becomes active again
  const onFocus = () =>  refreshCart();
  window.addEventListener("focus", onFocus);

  return () => {
    window.removeEventListener("focus", onFocus);
  };
  }, []);

  return (
    <CartContext.Provider value={{ items, total, refreshCart, addToCart, loading }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
