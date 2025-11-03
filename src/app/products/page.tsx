"use client";

import { useState, useEffect } from "react";
import { ProductWithCategory, Filters} from "@/types/productTypes";
import ProductCard from "@/components/productCard";
import ProductFilters from "@/components/productFilters";
import Pagination from "@/components/paginations";
import { ProductListSkeleton } from "@/components/ui/loading-skeleton";
import CategoryCarousel from "@/components/categoryCarousel";




export default function ProductsPage() {
  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
   const [filters, setFilters] = useState<Filters>({});


  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; // adjust as needed

  // Calculate indexes
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Number of pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = "/api/products";
        const params=new URLSearchParams();
        if(filters.category)
        {
          params.append("category",filters.category);
        }
        if(filters.minPrice)
        {
          params.append("minPrice", String(filters.minPrice));

        }
        if(filters.maxPrice)
        {
          params.append("maxPrice",String(filters.maxPrice));
        }
        if(filters.sortBy)
        {
          params.append("sortBy",filters.sortBy);
        }
        if(filters.order){
          params.append("order",filters.order);
        }
        if(params.toString())
        {
          url+=`?${params.toString()}`
        }
        const res = await fetch(url);
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to fetch products");

        setProducts(data.products);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  if (loading) return <ProductListSkeleton />;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <>

    <div className="max-w-7xl mx-auto px-6 py-10">
     

      {/* Category Carousel */}
      <div className="mb-8">
        <CategoryCarousel onCategorySelect={(category) => {
          setFilters(prev => ({
            ...prev,
            category: category || "",    // overwrite even if empty
          }));
          setCurrentPage(1); // Reset to first page when filtering
        }} />
      </div>

      {/* Two-column layout: Filters on left, Products on right */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left side: Filters */}
        <div className="md:w-1/4">
          <ProductFilters setFilters={setFilters} filters={filters}/>
        </div>

        {/* Right side: Products and Pagination */}
        <div className="md:w-3/4">
          {products.length === 0 ? (
            <p className="text-gray-600">No products found.</p>
          ) : (
            <>
              <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {currentProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
              <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}/>
            </>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
