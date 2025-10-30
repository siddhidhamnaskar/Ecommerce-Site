// "use client" // or fetch API

import { AddToCartButton } from "@/components/addToCart";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{ id: string }>;

}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!product) return notFound();

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


        <AddToCartButton productId={product.id} />
      
      </div>
    </div>
  
  );
}
