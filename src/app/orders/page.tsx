"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { OrderSkeleton } from "@/components/ui/loading-skeleton";

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: {
    id: string;
    name: string;
    image?: string;
  };
}

interface Order {
  id: string;
  total: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

export default function OrdersPage() {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
        <p className="text-gray-600">
          Please <Link href="/login" className="text-blue-600 hover:underline">login</Link> to view your orders.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
        <OrderSkeleton />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
        <p className="text-gray-600">You haven&apos;t placed any orders yet.</p>
        <Link href="/products" className="text-blue-600 hover:underline">Start shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">Order #{order.id.slice(-8)}</h3>
                <p className="text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold"> ₹{order.total.toFixed(0)}</p>
                <span className={`px-2 py-1 rounded text-sm ${
                  order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                  order.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-800' :
                  order.status === 'SHIPPED' ? 'bg-purple-100 text-purple-800' :
                  order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-gray-600">
                {order.items.length} item{order.items.length !== 1 ? 's' : ''}
              </p>
              <button
                onClick={() => toggleOrderDetails(order.id)}
                className="text-blue-600 hover:underline"
              >
                {expandedOrder === order.id ? 'Hide Details' : 'Show Details'}
              </button>
            </div>

            {expandedOrder === order.id && (
              <div className="mt-4 border-t pt-4">
                <h4 className="font-semibold mb-2">Order Items:</h4>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center">
                      {item.product.image && (
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          width={50}
                          height={50}
                          className="rounded mr-3"
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity} × ${item.price.toFixed(0)}
                        </p>
                      </div>
                      <p className="font-semibold">
                         ₹{(item.price * item.quantity).toFixed(0)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
