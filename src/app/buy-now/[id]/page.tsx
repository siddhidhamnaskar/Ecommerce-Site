"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle } from "lucide-react";
import { ProductWithCategory } from "@/types/productTypes";

export default function BuyNowPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [product, setProduct] = useState<ProductWithCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    nameOnCard: "",
  });
  const [placingOrder, setPlacingOrder] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

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

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    // Validate required fields
    if (!shippingInfo.name || !shippingInfo.address || !shippingInfo.city || !shippingInfo.state || !shippingInfo.zip || !shippingInfo.country) {
      setAlert({ type: "error", message: "Please fill in all shipping information fields." });
      return;
    }

    if (paymentMethod === "card" && (!paymentInfo.cardNumber || !paymentInfo.expiry || !paymentInfo.cvv || !paymentInfo.nameOnCard)) {
      setAlert({ type: "error", message: "Please fill in all payment information fields." });
      return;
    }

    setPlacingOrder(true);

    try {
      const response = await fetch("/api/orders/single", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          productId: product?.id,
          quantity: 1,
          shippingInfo,
          paymentMethod,
        }),
      });

      if (response.ok) {
        const order = await response.json();
        setAlert({ type: "success", message: "Order placed successfully!" });
        router.push("/orders"); // Redirect to orders page
      } else {
        const error = await response.json();
        setAlert({ type: "error", message: `Failed to place order: ${error.error}` });
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setAlert({ type: "error", message: "An error occurred while placing the order. Please try again." });
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!product) return <p className="text-center mt-10">Product not found</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Buy Now</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex items-center border rounded-lg p-4">
              {product.image && (
                <Image
                  src={product.image}
                  alt={product.name}
                  width={60}
                  height={60}
                  className="rounded-lg mr-4"
                />
              )}
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">Qty: 1</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">
                  ₹{product.price.toFixed(0)}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <span>₹{product.price.toFixed(0)}</span>
            </div>
          </div>
        </div>

        {/* Forms */}
        <div className="space-y-8">
          {alert && (
            <Alert variant={alert.type === "error" ? "destructive" : "default"}>
              {alert.type === "success" ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          )}
          {/* Shipping Information */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={shippingInfo.name}
                onChange={handleShippingChange}
                className="w-full p-3 border rounded-lg"
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={shippingInfo.address}
                onChange={handleShippingChange}
                className="w-full p-3 border rounded-lg"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={shippingInfo.city}
                  onChange={handleShippingChange}
                  className="p-3 border rounded-lg"
                  required
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={shippingInfo.state}
                  onChange={handleShippingChange}
                  className="p-3 border rounded-lg"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="zip"
                  placeholder="ZIP Code"
                  value={shippingInfo.zip}
                  onChange={handleShippingChange}
                  className="p-3 border rounded-lg"
                  required
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={shippingInfo.country}
                  onChange={handleShippingChange}
                  className="p-3 border rounded-lg"
                  required
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  Credit/Debit Card
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  Cash on Delivery
                </label>
              </div>

              {paymentMethod === "card" && (
                <div className="space-y-4">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={paymentInfo.cardNumber}
                    onChange={handlePaymentChange}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM/YY"
                      value={paymentInfo.expiry}
                      onChange={handlePaymentChange}
                      className="p-3 border rounded-lg"
                      required
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={paymentInfo.cvv}
                      onChange={handlePaymentChange}
                      className="p-3 border rounded-lg"
                      required
                    />
                  </div>
                  <input
                    type="text"
                    name="nameOnCard"
                    placeholder="Name on Card"
                    value={paymentInfo.nameOnCard}
                    onChange={handlePaymentChange}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                </div>
              )}

              {paymentMethod === "cod" && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800">
                    You will pay in cash when your order is delivered to your doorstep.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            disabled={placingOrder}
            className={`w-full py-4 text-white font-semibold rounded-lg ${
              placingOrder ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            } transition`}
          >
            {placingOrder ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
