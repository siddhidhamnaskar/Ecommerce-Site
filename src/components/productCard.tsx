import { ProductWithCategory } from "@/types/productTypes"

interface ProductCardProps {
  product: ProductWithCategory;
}

export default function ProductCard({product}:ProductCardProps){

    return <>
      <div
              key={product.id}
              className="bg-white border rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
            >
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
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
                  ₹{product.price}
                </p>
              </div>
            </div>
    </>
}