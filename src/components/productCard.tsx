"use client";

import { ProductWithCategory } from "@/types/productTypes";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ProductCardProps {
  product: ProductWithCategory;
  onClick?: () => void;
}

export default function ProductCard({product}:ProductCardProps){
    const router = useRouter();
    const handleClick = () => {
    // Redirect to product details page with product id
    router.push(`/productDetails/${product.id}`);
  };


    return <>
      <div
              key={product.id}
              className="bg-white  rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
              onClick={handleClick}
            >
              {product.image ? (
                <div className="relative w-full h-48 rounded-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-content"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
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
                  ₹{product.price.toFixed(0)}
                </p>
              </div>
            </div>
    </>
}